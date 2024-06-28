import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Address } from "./schema/address.schema";
import { AddressService } from "./address.service";
import { User } from "../user/schema/user.schema";
import { UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";
import { CommonSuccessResponce, PaginationDTO } from "src/common/common";
import { AddressDTO } from "./DTO/address.dto";
import { UpdateAddressDTO } from "./DTO/partialType/updateAddress.partialType";
import { SkipThrottle } from "@nestjs/throttler";

@Resolver(() => Address)
export class AddressResolver {
    constructor(
        private addressService: AddressService
    ) {}

    /// Get all addresses 
    @Query(() => [ Address ])
    @SkipThrottle()
    @UseGuards(AccessTokenGuard)
    async getAllAddresses(@Args() paginationDTO: PaginationDTO): Promise<Address[]> {
        return this.addressService.getAllAddresses(paginationDTO);
    }

    /// Count address document
    @Query(() => Number)
    @UseGuards(AccessTokenGuard)
    async countAddresses(): Promise<number> {
        return this.addressService.countAddresses();
    }

    /// Get addresses by userId
    @Query(() => User)
    @UseGuards(AccessTokenGuard)
    async getAddressByUserId(@Args('userId') userId: string): Promise<Address> {        
        return this.addressService.getAddressByUserId(userId);
    }

    /// Add address
    @Mutation(() => CommonSuccessResponce)
    @UseGuards(AccessTokenGuard)
    @SkipThrottle()
    async addAddress(@Args('addAddressDTO') addressDTO: AddressDTO): Promise<CommonSuccessResponce> {
        return this.addressService.addAddress(addressDTO);
    }

    /// Update address
    @Mutation(() => CommonSuccessResponce)
    @UseGuards(AccessTokenGuard)
    @SkipThrottle()
    async updateAddress(
        @Args('addressId') addressId: string,
        @Args('updateAddressDTO') updateAddressDTO: UpdateAddressDTO
    ): Promise<CommonSuccessResponce> {
        return this.addressService.updateAddress(addressId,updateAddressDTO);
    }

    /// Delete address
    @Mutation(() => CommonSuccessResponce)
    @UseGuards(AccessTokenGuard)
    @SkipThrottle()
    async deleteAddress(@Args('addressId') addressId: string): Promise<CommonSuccessResponce> {
        return this.addressService.deleteAddress(addressId);
    }
}