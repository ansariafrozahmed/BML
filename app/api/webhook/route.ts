import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    // 1. Read Razorpay Secret from Environment Variables
    const razorpaySecret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    // 2. Parse Webhook Request Body
    const rawBody = await req.text();
    const razorpaySignature = req.headers.get("x-razorpay-signature");

    // 3. Generate Signature for Verification
    const generatedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(rawBody)
      .digest("hex");

    if (razorpaySignature !== generatedSignature) {
      console.error("Invalid Razorpay Signature");
      return NextResponse.json(
        { status: "error", message: "Invalid signature" },
        { status: 401 }
      );
    }

    // 4. Parse the Webhook Body
    const body = JSON.parse(rawBody);
    const event = body.event;
    const payload = body.payload;

    // 5. Prepare Final Payload
    let finalPayload: Record<string, any> = {
      event,
      timestamp: new Date().toISOString(), // Capture event timestamp
    };

    switch (event) {
      case "payment.authorized":
        finalPayload = {
          ...finalPayload,
          id: payload.payment.entity.id,
          amount: payload.payment.entity.amount,
          currency: payload.payment.entity.currency,
          status: payload.payment.entity.status,
          order_id: payload.payment.entity.order_id,
          method: payload.payment.entity.method,
          email: payload.payment.entity.email,
          contact: payload.payment.entity.contact,
          created_at: payload.payment.entity.created_at,
          type: "Payment Authorized",
        };
        console.log("Payment Authorized:", finalPayload);
        break;

      case "payment.captured":
        finalPayload = {
          ...finalPayload,
          id: payload.payment.entity.id,
          amount: payload.payment.entity.amount,
          currency: payload.payment.entity.currency,
          status: payload.payment.entity.status,
          order_id: payload.payment.entity.order_id,
          invoice_id: payload.payment.entity.invoice_id,
          method: payload.payment.entity.method,
          email: payload.payment.entity.email,
          contact: payload.payment.entity.contact,
          fee: payload.payment.entity.fee,
          tax: payload.payment.entity.tax,
          created_at: payload.payment.entity.created_at,
          type: "Payment Captured",
        };
        break;

      case "subscription.charged":
        finalPayload = {
          ...finalPayload,
          id: payload.subscription.entity.id,
          plan_id: payload.subscription.entity.plan_id,
          status: payload.subscription.entity.status,
          total_count: payload.subscription.entity.total_count,
          paid_count: payload.subscription.entity.paid_count,
          charge_at: payload.subscription.entity.charge_at,
          end_at: payload.subscription.entity.end_at,
          created_at: payload.subscription.entity.created_at,
          type: "Subscription Charged",
        };
        break;

      case "payment.failed":
        finalPayload = {
          ...finalPayload,
          id: payload.payment.entity.id,
          amount: payload.payment.entity.amount,
          currency: payload.payment.entity.currency,
          status: payload.payment.entity.status,
          error_code: payload.payment.entity.error_code,
          error_description: payload.payment.entity.error_description,
          email: payload.payment.entity.email,
          contact: payload.payment.entity.contact,
          created_at: payload.payment.entity.created_at,
          type: "Payment Failed",
        };
        break;

      case "subscription.authenticated":
        finalPayload = {
          ...finalPayload,
          id: payload.subscription.entity.id,
          plan_id: payload.subscription.entity.plan_id,
          status: payload.subscription.entity.status,
          total_count: payload.subscription.entity.total_count,
          start_at: payload.subscription.entity.start_at,
          end_at: payload.subscription.entity.end_at,
          created_at: payload.subscription.entity.created_at,
          type: "Subscription Authenticated",
        };
        break;

      default:
        console.log(`Unhandled event: ${event}`);
        finalPayload = { ...finalPayload, type: "Unhandled Event", payload };
    }

    // 6. Send Final Payload to Backend
    // Here you can use a fetch request or save directly to your database
    // Example:
    // await fetch("http://localhost:3002/api/save-webhook-data", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(finalPayload),
    // });

    // 7. Respond to Razorpay
    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
