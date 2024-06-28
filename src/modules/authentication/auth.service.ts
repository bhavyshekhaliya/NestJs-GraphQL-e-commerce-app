import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../user/schema/user.schema";
import { Model } from "mongoose";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UtilService } from "src/common/utils/utils.service";
import { RegisterUserDTO } from "../user/DTO/registerUser.dto";
import { Http400Exception, Http401Exception, Http404Exception } from "src/common/exception/custom.exception";
import { AddressDTO } from "../address/DTO/address.dto";
import { Address, AddressDocument } from "../address/schema/address.schema";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
        private userService: UserService,
        private jwtService: JwtService,
        private utilService: UtilService,
        private configService: ConfigService
    ) {}
 
     /// SignUp Service
     async signUp(registerUserDTO: RegisterUserDTO,addressDTO: AddressDTO) : Promise<any> {
        try {
            const userData = await this.userService.getUserByPhoneNumber(registerUserDTO.phoneNumber);
            
            if(userData) {
                throw new Http400Exception("User with this phone number already exist")
            }
            
            // write below code insted of writing commented code for the optimize code to redus the number of api calls
            // const newCreatedUser = await this.userModel.create(registerUserDTO);
            // const addressData = await this.addressModel.create(addressDTO);
            const [ newCreatedUser, addressData ] = await Promise.all([
                this.userModel.create(registerUserDTO),
                this.addressModel.create(addressDTO),
            ]);
 
            await this.userModel.findByIdAndUpdate(newCreatedUser._id, { $push: { 'businessDetail.addressIds': addressData._id } }, { new: true });

            const tokens = await this.utilService.getTokens(newCreatedUser._id);

            newCreatedUser.refreshToken = tokens.refreshToken;

            const newCreatedUserData = await newCreatedUser.save();

            await this.hashAndUpdateRefreshToken(newCreatedUser._id,tokens.refreshToken);
    
            return {
                ...newCreatedUserData.toObject(),
                accessToken: tokens.accessToken,
            }
        } catch (error) {   
            if ((error instanceof Http400Exception)) {
                throw error;
            }
            throw new Http400Exception("Failed to sign up user.");
        }
    }
 
    /// SignIn Service
    async signIn(phoneNumber: number): Promise<any> {
        try {
          const userData = await this.userService.getUserByPhoneNumber(phoneNumber);
  
          if(!userData) {
              throw new Http404Exception('User not found');
          }
  
          const tokens = await this.utilService.getTokens(userData._id);
  
          await this.hashAndUpdateRefreshToken(userData._id,tokens.refreshToken);
 
          return {
             ...userData,
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken
          };
        } catch (error) {
            if ((error instanceof Http404Exception)) {
                throw error;
            }
            throw new Http400Exception("Failed to sign in.");
        }
     }

    /// Update and hash RefreshToken in Database service
    async hashAndUpdateRefreshToken(id: string, refreshToken:string): Promise<any> {
        try {
            const hashedRefreshToken = await this.utilService.hashData(refreshToken,10);
            
            await this.userService.updateRefreshTokenInDb(id,{
                refreshToken: hashedRefreshToken,
            });
    
            return hashedRefreshToken;
        } catch (error) {
            throw new Http400Exception("Failed to update refresh token.");
        }
    }

    /// Update AccessToken Service
    async updateExpiredAccessTokenService(refreshToken) : Promise<User> {
 
        try {
          const verfiyRefreshToken = await this.jwtService.verifyAsync(refreshToken,{ secret: this.configService.get<string>('JWT_REFRESH_SECRET'), });
            
          if(!verfiyRefreshToken) {
              throw new Http401Exception("Invalid refresh token.");
          }
  
          const newAccessToken = await this.utilService.getAccessToken(refreshToken);
  
          return {
              accessToken: newAccessToken
          } as User;
        } catch (error) {
            if ((error instanceof Http401Exception)) {
                throw error;
            }
             throw new Http400Exception("Failed to update accessToken.");
        }
     }
}