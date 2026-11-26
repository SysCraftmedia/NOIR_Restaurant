import { Html, Button, Text, Container } from "@react-email/components";

export default function OrderReceipt({ orderId, total }: { orderId: string, total: string }) {
  return (
    <Html>
      <Container>
        <Text style={{ fontSize: "20px", fontWeight: "bold" }}></Text>
        <Text>Aapka order successfully place ho gaya hai!</Text>
        <Text>Total Amount: Rs. {total}</Text>
        <Button 
          href={`https://yourwebsite.com/orders/${orderId}`}
          style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
        >
          Track Your Order
        </Button>
      </Container>
    </Html>
  );
}