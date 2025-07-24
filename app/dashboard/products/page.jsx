import { Suspense } from "react";
import Link from "next/link";
import { Eye, Shell } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductData from "./product-data";

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link href="/products">
          <Button variant="outline">
            <Eye />
            View as User
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>
            View and manage all the listed product entries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-[186px]">
                <Shell className="animate-spin duration-1000 text-blue-600" />
              </div>
            }
          >
            <ProductData />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
