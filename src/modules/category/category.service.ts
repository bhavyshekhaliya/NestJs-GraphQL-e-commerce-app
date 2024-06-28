import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./schema/category.schema";
import { Model } from "mongoose";
import { CategoryModule } from "./category.module";
import { Http400Exception, Http404Exception } from "src/common/exception/custom.exception";
import { CategoryDTO } from "./DTO/category.dto";
import { CommonSuccessResponce, PaginationDTO } from "src/common/common";
import { UpdateCategoryDTO } from "./DTO/partialType/updateCategory.partialType";

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<CategoryModule>
    ) {}
    
    /// Get all categories service
    async getAllCategories(paginationDTO: PaginationDTO = { skip: 0, take: 5 }): Promise<Category[]> {
        try {
            const categories: Category[] = (await this.categoryModel.find(
                null, null, {
                    limit: paginationDTO.take,
                    skip: paginationDTO.skip
                }
            ).lean().exec()) as Category[];

            return categories;
        } catch (error) {
            throw new Http404Exception("Failed to retrieve categories.");
        }
    }

    /// count category document service
    async countCategories(): Promise<number> {
        try {
            const numberOfCategories: number = await this.categoryModel.countDocuments().lean().exec();
            return numberOfCategories;
        } catch (error) {
            throw new Http400Exception('Failed to count categories.')
        }
    } 

    /// Get category by id
    async getCategoryById(categoryId: string): Promise<any> {
        try {
            const category: Category = (await this.categoryModel.findById(categoryId).lean().exec()) as Category;
            return category;
        } catch (error) {
            throw new Http404Exception("Failed to retrieve category.");
        }
    }

    /// Add category Service
    async addCategory(categoryDTO: CategoryDTO): Promise<CommonSuccessResponce> {
        try {
            await this.categoryModel.create(categoryDTO);
            return {
                code: 200,
                message: "Category added successfully"
            }
        } catch (error) {
            throw new Http400Exception("Failed to add category.");
        }
    }

    /// Update category service
    async updateCategory(categoryId:string,updateCategoryDTO: UpdateCategoryDTO): Promise<CommonSuccessResponce> {
        try {
            await this.categoryModel.findByIdAndUpdate(categoryId, updateCategoryDTO, { new: true }).lean().exec();
            return {
                code: 200,
                message: "Category updated successfully"
            }
        } catch (error) {
            throw new Http400Exception("Failed to update category.");
        }
    }

    /// delete category service
    async deleteCategory(categoryId: string): Promise<CommonSuccessResponce> {
        try {
            await this.categoryModel.findByIdAndDelete(categoryId).lean().exec();
            return {
                code: 200,
                message: "Category deleted successfully"
            }
        } catch (error) {
            throw new Http400Exception("Failed to delete category.");
        }
    }

}