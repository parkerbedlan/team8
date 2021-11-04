import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import path from "path";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "hello world";
  }

  @Mutation(() => Boolean)
  async uploadTestImage(
    @Arg("fileUpload", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload
  ) {
    try {
      await new Promise((res) =>
        createReadStream()
          .pipe(createWriteStream(path.join(__dirname, "../images", filename)))
          .on("close", res)
      );
    } catch (error) {
      console.error(error);
    }
    return true;
  }
}
