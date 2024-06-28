import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Version, VersionDocument } from "./schema/version.schema";
import { AppVersionDTO } from "./DTO/version.dto";
import { Http404Exception } from "src/common/exception/custom.exception";

@Injectable()
export class VersionService {

    constructor(
        @InjectModel(Version.name) private versionModel: Model<VersionDocument>,
    ) {}

    /// Get user app version detaill service
    async getAppVersionDetailService(appVersionDTO: AppVersionDTO): Promise<any> {
        try {
            const versionDetail = await this.versionModel.findOne().lean().exec();

            if (!versionDetail) {
                throw new Http404Exception('Version details not found');
            }
            
            const currentVersion = versionDetail.version;
            const userAppVersion = appVersionDTO.version;

            const currentVersionParts = currentVersion.split('.').map(Number);
            const userVersionParts = userAppVersion.split('.').map(Number);

            if (currentVersionParts[0] < userVersionParts[0]) {
                return {
                    appStatus: "FORCE_UPDATE",
                    isAppActive: true
                };
            } else if (currentVersionParts[0] === userVersionParts[0]) {
                if (currentVersionParts[1] < userVersionParts[1]) {
                    return {
                        appStatus: "NORMAL_UPDATE",
                        isAppActive: true
                    };
                } else if (currentVersionParts[1] === userVersionParts[1]) {
                    if (currentVersionParts[2] < userVersionParts[2]) {
                        return {
                            appStatus: "NORMAL_UPDATE",
                            isAppActive: true
                        };
                    } else {
                        return {
                            appStatus: null,
                            isAppActive: true
                        };
                    }
                } else {
                    return {
                        appStatus: null,
                        isAppActive: true
                    };
                }
            } else {
                return {
                    appStatus: null,
                    isAppActive: true
                };
            }
        } catch(error) {
            if ((error instanceof Http404Exception)) {
                throw error;
            }
            throw new Http404Exception("Unable to retrieve version details");
        }
    }
}