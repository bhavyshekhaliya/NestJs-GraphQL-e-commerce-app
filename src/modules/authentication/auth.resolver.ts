import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "../user/schema/user.schema";
import { RegisterUserDTO } from "../user/DTO/registerUser.dto";
import { AddressDTO } from "../address/DTO/address.dto";

@Resolver(() => User)
export class AuthResolver {
    constructor(
        private authService: AuthService,
    ) {}

    @Mutation(() => User)
    async signUp(
        @Args('registerUserDTO') registerUserDTO: RegisterUserDTO,
        @Args('addressDTO') addressDTO: AddressDTO,
    ): Promise<any> {
        return this.authService.signUp(registerUserDTO,addressDTO);
    }

    @Query(() => User)
    async signIn(@Args('phoneNumber') phoneNumber: number): Promise<any> {
        return this.authService.signIn(phoneNumber);
    }

    @Mutation(() => User)
    async updateExpiredAccessToken(@Args('refreshToken') refreshToken: string): Promise<User> {
        return this.authService.updateExpiredAccessTokenService(refreshToken);
    }
}    