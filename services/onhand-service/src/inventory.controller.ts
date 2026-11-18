
import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { InventoryService } from "./inventory.service";

@Controller("inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post("receive")
  async receive(
    @Body() body: { sku: string; location: string; quantity: number; operationId: string },
    @Headers("x-correlation-id") correlationId = crypto.randomUUID()
  ) {
    return this.inventoryService.receive({ ...body, correlationId });
  }

  @Get(":sku/:location")
  async get(@Param("sku") sku: string, @Param("location") location: string) {
    return {
      sku,
      location,
      onHand: await this.inventoryService.getOnHand(sku, location)
    };
  }
}
