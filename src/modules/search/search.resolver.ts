import { Args, Query, Resolver } from "@nestjs/graphql";
import { SearchService } from "./search.service";
import { SearchResult } from "./schema/search.schema";
import { UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";

@Resolver()
export class SearchResolver {
    constructor(
        private searchService: SearchService
    ) {}

    /// search product 
    @Query(() => [SearchResult])
    @UseGuards(AccessTokenGuard)
    async searchProduct(@Args('searchInput') searchInput: string) {
        return this.searchService.searchProduct(searchInput);
    }
}