import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(`${process.env.DATABASE_URL}`);

// docs
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages

// HTTP
// way of thinking => client <==> server
// Protocol => set of rules
// Request => a request is a message that is send to the server by clien.
// Response => Response is the reply of the server to the client.

// Message Structure
//  starting line => 1.Method  2.request-target  3.Protocol
// Headers => containing metadata that describe that message
// Empty line => this empty line represent the the end of headers
// Body => containing data. starting line or header define that how this data is delivered.

// Http methods
// Http methods are the way of interaction of the client with the server.
// Get => retrive data from the server. it's read only.
// Post => send data to the server.
// Delete => delete data from the server
// Put => update the whole data, this is idempotent
// Patch => same as put, update the data but partly

// Request target
// An absolute or relative url.
// 1. origin form, A query string can be appended to the path for additional information
// 2. absolute form, => a complete url
// 3. there are two more but I will read further them when needed.

//
// Headers
// headers are the metadata that containing information about the request.
// There are two types of headers
// 1. Request headers provide additional context to a request or add extra logic to how it should be treated by a server
// 2. Representation headers are sent in a request if the message has a body, and they describe the original form of the message data and any encoding applied. This allows the recipient to understand how to reconstruct the resource as it was before it was transmitted over the network.

// Request headers
// Provide metadata about the requset.
// these headers helps the server how to handle the request.
// Host: Specify the domain name of the server, not url, it's domain name.
// User-Agent: Provide infrormation about the client that is making the request.
// Accept: Tells the server what is the content type the server can handle. (application/json)
// Authorization: used for authontication. (eg Authorization: Bearer <token>)
// Referer: Indicate the url from which the requst orginated.
// Content-Type: Specify the type of content send in the body. (application/json)

// Representational headers
// focus on how the content is formated and structured.
//  describe the representation (or format) of the resource being transferred. These headers help the client and server agree on how data should be interpreted.
// Content-Type: Define the format of the response body.
// Content-Encoding: Specifies the encoding used to compress the response (e.g., gzip, br)
// Content-Language: Indicates the language of the resource (e.g., Content-Language: en-US).
// Content-Length: Specifies the size (in bytes) of the response body.
// Content-Disposition: Used to indicate whether the content should be displayed inline or downloaded as an attachment (e.g., attachment; filename="example.pdf").

// Body
// the part of the request that carry information to the server.
// only put, patch, and post request has the body.
// this is the container of actual data.

// Http responses
// <protocol> <status-code> <status-text>

// Response headers
// // https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages
// 1. Response headers => how the response should be handled, provide metadata about the response.
// Date, Server, Cache-Control, Set-Cookie, Strict-Transport-Security
// 2. Representational headers. => specific to the format. describe the format and structure of the actual content being sent.
// Content-Type, Content-Encoding, Content-Language, Content-Length, Content-Disposition

// Response body => contain the data that is sended by the server.


interface ApiResponse <T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
}


// Catching
// only get method is catched.
export const dynamic = 'force-static';

// Revalidation
export const revalidate = 60;


// Route handlers are custom request handlers.
export async function GET(): Promise<NextResponse> {
  try {
    const data = await sql("SELECT * FROM doctors");
    // Convert the response in to json format.
    return NextResponse.json({ success: true, data } as ApiResponse);
  } catch (error) {
    // type assertion
    // override the compilers inferred type of a variable.
    // generally used in api or working with dom elements.
    const err = error as Error;
      return NextResponse.json({success: false, error: err.message} as ApiResponse);
  }
}

// NextResponse.json({success: false, error:error.message});
// This is used on the server-side in Next.js API routes.
// It serializes a JavaScript object into a JSON string before sending it as a response.
// It also automatically sets the Content-Type: application/json header.
