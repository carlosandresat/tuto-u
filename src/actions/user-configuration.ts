"use server";

import { z } from "zod";
import { db } from "@/lib/db";

import { UserPricingSchema } from "@/schemas";

export const updateUserPricing = async (
  data: z.infer<typeof UserPricingSchema>, userId: string
) => {
  const validatedFields = UserPricingSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }

  const {
    durations,
    priceOneHour,
    priceOneHalfHour,
    priceTwoHours,
    priceTwoHalfHours,
    priceThreeHours,
  } = validatedFields.data;

  await db.userPricingConfiguration.deleteMany({
    where: {
      userId: userId,
    },
  });

  const newPricing = [];

  if (durations.includes("1h")) {
    if (!priceOneHour) {
      newPricing.push({
        userId: userId,
        duration: 60,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: userId,
        duration: 60,
        price: priceOneHour,
      });
    }
  }
  if (durations.includes("1.5h")) {
    if (!priceOneHalfHour) {
      newPricing.push({
        userId: userId,
        duration: 90,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: userId,
        duration: 90,
        price: priceOneHalfHour,
      });
    }
  }
  if (durations.includes("2h")) {
    if (!priceTwoHours) {
      newPricing.push({
        userId: userId,
        duration: 120,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: userId,
        duration: 120,
        price: priceTwoHours,
      });
    }
  }
  if (durations.includes("2.5h")) {
    if (!priceTwoHalfHours) {
      newPricing.push({
        userId: userId,
        duration: 150,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: userId,
        duration: 150,
        price: priceTwoHalfHours,
      });
    }
  }
  if (durations.includes("3h")) {
    if (!priceThreeHours) {
      newPricing.push({
        userId: userId,
        duration: 180,
        price: 0,
      });
    } else {
      newPricing.push({
        userId: userId,
        duration: 180,
        price: priceThreeHours,
      });
    }
  }

  await db.userPricingConfiguration.createMany({
    data: newPricing,
  });

  return { sucess: "Precios actualizados" };
};
