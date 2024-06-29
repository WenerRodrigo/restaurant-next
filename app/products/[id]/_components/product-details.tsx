"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrementQuantityCLick = () => {
    setQuantity((currentState) => currentState + 1);
  };

  const handleDecrementQuantityCLick = () => {
    setQuantity((currentState) => {
      if (currentState === 1) return 1;
      return currentState - 1;
    });
  };

  return (
    <div className="p-5">
      <div className="flex items-center gap-[0.375rem]">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h1 className="mb-2 mt-1 text-xl font-semibold">{product.name}</h1>

      <div>
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>

          {product.discountPercentage > 0 && (
            <p className="text-muted-foregroun text-sm">
              {" "}
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleIncrementQuantityCLick}
          >
            <ChevronLeftIcon />
            <Button size="icon" onClick={handleDecrementQuantityCLick}>
              <span className="w-4">{quantity}</span>
            </Button>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <Card className="mt-6 flex justify-around py-3">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <BikeIcon size={14} />
          </div>

          {Number(product.restaurant.deliveryFee) > 0 ? (
            <p className="text-xs font-semibold">
              R$ {formatCurrency(Number(product.restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-xs font-semibold">Grátis</p>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <TimerIcon size={14} />
          </div>

          {Number(product.restaurant.deliveryFee) > 0 ? (
            <p className="text-xs font-semibold">
              R$ {formatCurrency(Number(product.restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-xs font-semibold">Grátis</p>
          )}
        </div>
      </Card>

      <div className="mt-6 space-y-3">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="font-semibold">Sucos</h3>
        
      </div>
    </div>
  );
};

export default ProductDetails;
