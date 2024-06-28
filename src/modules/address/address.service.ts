import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Address } from "./schema/address.schema";
import { Model } from "mongoose";
import { AddressModule } from "./address.module";
import { User } from "../user/schema/user.schema";
import { UserModule } from "../user/user.module";
import { Http400Exception, Http401Exception, Http404Exception } from "src/common/exception/custom.exception";
import { AddressDTO } from "./DTO/address.dto";
import { CommonSuccessResponce, PaginationDTO } from "src/common/common";
import { UpdateAddressDTO } from "./DTO/partialType/updateAddress.partialType";

@Injectable()
export class AddressService {
    constructor(
        @InjectModel(Address.name) private addressModel: Model<AddressModule>,
        @InjectModel(User.name) private userModel: Model<UserModule>,
    ) {}

    /// Get all addresses service
    async getAllAddresses(paginationDTO: PaginationDTO = { skip: 0, take: 5 }): Promise<Address[]> {
        try {
            const addresses: Address[] =  (await this.addressModel.find(null,null, {
                limit: paginationDTO.take,
                skip: paginationDTO.skip
            }).lean().exec()) as Address[];

            return addresses;
        } catch (error) {
            throw new Http401Exception('Failed to retrieve addresses.');
        }
    }

    /// Count addresses document service
    async countAddresses(): Promise<number> {
        try {
            const numberOfAddresses: number = await this.addressModel.countDocuments().lean().exec();

            return numberOfAddresses; 
        } catch (error) {
            throw new Http400Exception('Failed to count addresses.')
        }
    }

    /// Get addresses by userId service
    async getAddressByUserId(userId: string): Promise<Address> {
        try {
            const address: Address = (await this.userModel.findById(userId).populate({
                path: 'businessDetail.addressIds',
                model: 'Address'
            }).lean().exec()) as Address; 
            
            return address;
        } catch (error) {
            throw new Http404Exception('Failed to retrieve addresses for the user.');
        }
    }

    /// Add address service
    async addAddress(addressDTO: AddressDTO): Promise<CommonSuccessResponce> {
        try {
            await this.addressModel.create(addressDTO);
            return {
                code: 200,
                message: "Address added successfully"
            }
        } catch (error) {
            throw new Http400Exception('Failed to add address.');
        }
    }

    /// Update address service
    async updateAddress(addressId: string, updateAddressDTO: UpdateAddressDTO): Promise<CommonSuccessResponce> {
        try {
            await this.addressModel.findByIdAndUpdate(addressId, updateAddressDTO, { new: true }).lean().exec();
            return {
                code: 200,
                message: "Address updated successfully"
            }
        } catch (error) {
            throw new Http400Exception('Failed to update address.');
        }
    }

    /// Delete address service
    async deleteAddress(addressId: string): Promise<CommonSuccessResponce> {
        try {
            await this.addressModel.findByIdAndDelete(addressId).lean().exec();
            return {
                code: 200,
                message: "Address deleted successfully"
            }
        } catch (error) {
            throw new Http400Exception('Failed to delete address.');
        }
    }
}  