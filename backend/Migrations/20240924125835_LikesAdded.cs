using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class LikesAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "77fb8797-7212-4ad5-bc06-d9c19ba35d61");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ee0d1187-b50a-4c89-bba3-8c2524427ac5");

            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    CheckInId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Likes_CheckIns_CheckInId",
                        column: x => x.CheckInId,
                        principalTable: "CheckIns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4b4068be-b583-4c20-b801-1ba4f0d569ac", null, "Admin", "ADMIN" },
                    { "596ee61b-3d98-4657-82c1-9a39f5709ee6", null, "Member", "MEMBER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Likes_CheckInId",
                table: "Likes",
                column: "CheckInId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Likes");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4b4068be-b583-4c20-b801-1ba4f0d569ac");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "596ee61b-3d98-4657-82c1-9a39f5709ee6");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "77fb8797-7212-4ad5-bc06-d9c19ba35d61", null, "Member", "MEMBER" },
                    { "ee0d1187-b50a-4c89-bba3-8c2524427ac5", null, "Admin", "ADMIN" }
                });
        }
    }
}
