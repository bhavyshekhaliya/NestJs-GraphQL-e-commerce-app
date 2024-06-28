import { Resolver , Query, Args } from "@nestjs/graphql";
import { Version } from "./schema/version.schema";
import { AppVersionDTO } from "./DTO/version.dto";
import { VersionService } from "./version.service";

@Resolver(() => Version)
export class VersionResolver {

    constructor(
        private versionService: VersionService
    ) {}

    /// Get User Version detail
    @Query(() => Version)
    async getAppVersionDetail(@Args('appVersionDTO') appVersionDTO: AppVersionDTO): Promise<any> {
        return this.versionService.getAppVersionDetailService(appVersionDTO);
    }
}