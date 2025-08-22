import Product from "../../../service/antiqueService";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import JWTVerify from "../../../security/jwtverify";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const value = searchParams.get("value");
  const type = searchParams.get("type");
  if (!page) {
    return NextResponse.json({ PAGE_ERROR: "PAGE PARAMETRER MISSING" });
  } else {
    if (!value) {
      const get = await Product.getProducts(page);

      if (!get) {
        return NextResponse.json({ ERROR_SERVER: "CANNOT GET PRODUCTS" });
      } else {
        const categoryArray = Array.from(
          new Set(get.docs.map((product) => product.category).filter(Boolean))
        );
        return NextResponse.json({
          SUCCESS: "200OK",
          PRODUCTS: get,
          categories: categoryArray,
        });
      }
    } else if (value && !type) {
      const get = await Product.getFilterProducts(page, value);

      if (!get) {
        return NextResponse.json({ ERROR_SERVER: "CANNOT GET PRODUCTS" });
      } else {
        const categoryArray = Array.from(
          new Set(get.docs.map((product) => product.category).filter(Boolean))
        );
        return NextResponse.json({
          SUCCESS: "200OK",
          PRODUCTS: get,
          categories: categoryArray,
        });
      }
    } else {
      const get = await Product.regexProduct(page, value);

      if (!get) {
        return NextResponse.json({ ERROR_SERVER: "CANNOT GET PRODUCTS" });
      } else {
        const categoryArray = Array.from(
          new Set(get.docs.map((product) => product.category).filter(Boolean))
        );
        return NextResponse.json({
          SUCCESS: "200OK",
          PRODUCTS: get,
          categories: categoryArray,
        });
      }
    }
  }
}

export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token || !token.value) {
    return NextResponse.json(
      { INVALID_TOKEN: "TOKEN DOESN'T EXIST" },
      { status: 401 }
    );
  }

  return new Promise((resolve) => {
    jwt.verify(token.value, process.env.KEY, async (err, credentials) => {
      if (err || !credentials) {
        return resolve(
          NextResponse.json(
            { INVALID_TOKEN: "UNAUTHORIZED TOKEN" },
            { status: 401 }
          )
        );
      }

      try {
        const body = await req.json();
        if (
          !body ||
          !body.name ||
          !body.description ||
          !body.price ||
          !body.category
        ) {
          return resolve(
            NextResponse.json({ MISSING_DATA: "MISSING DATA" }, { status: 400 })
          );
        }

        const create = await Product.createProduct(body);
        if (!create) {
          return resolve(
            NextResponse.json(
              { ERROR_CREATE: "CANNOT CREATE PRODUCT" },
              { status: 500 }
            )
          );
        }

        return resolve(
          NextResponse.json({ CREATE_SUCCESS: create }, { status: 201 })
        );
      } catch (error) {
        return resolve(
          NextResponse.json(
            { ERROR_CREATE: "CANNOT CREATE PRODUCT" },
            { status: 500 }
          )
        );
      }
    });
  });
}
