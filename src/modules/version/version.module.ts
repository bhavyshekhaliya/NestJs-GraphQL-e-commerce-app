import { Module, Version } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../user/schema/user.schema";
import { VersionResolver } from "./version.resolver";
import { VersionService } from "./version.service";

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Version.name,
                useFactory: () => UserSchema
            },                                                              
        ])
    ],
    providers: [
        VersionResolver,
        VersionService,
    ],
    controllers: [],
    exports: []
})
export class VersionModule {}