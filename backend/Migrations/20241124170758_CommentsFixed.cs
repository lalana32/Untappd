using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class CommentsFixed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5856a26d-c5b8-4858-b8ec-e9231efc5a2b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "591a6c02-00f6-49f0-8095-41422737ed6f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "523fb942-1283-44e8-8e19-2796c19ec32a", null, "Member", "MEMBER" },
                    { "da08e8b2-f24f-44b1-874d-0c5fd62329b9", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "523fb942-1283-44e8-8e19-2796c19ec32a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "da08e8b2-f24f-44b1-874d-0c5fd62329b9");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5856a26d-c5b8-4858-b8ec-e9231efc5a2b", null, "Admin", "ADMIN" },
                    { "591a6c02-00f6-49f0-8095-41422737ed6f", null, "Member", "MEMBER" }
                });
        }
    }
}
