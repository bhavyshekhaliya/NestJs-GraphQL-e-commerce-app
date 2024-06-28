import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UtilService } from "./utils.service";
import { UserModule } from "src/modules/user/user.module";

@Global()
@Module({
    imports: [ 
        UserModule
    ],
    providers: [ 
        JwtService,
        UtilService
    ],
    exports: [
        UtilService
    ]
})
export class UtilsModule {}