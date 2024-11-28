using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class NewestNotificationMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "24ad5b74-4115-4eba-a21c-4f434e32188a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9064ef1e-18f9-465b-be65-becc636a0991");

            migrationBuilder.RenameColumn(
                name: "NewFollowerId",
                table: "Notifications",
                newName: "InteractingUserId");

            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "Notifications",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Notifications",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6747e1cf-5715-4218-b42e-dd01a31ade33", null, "Member", "MEMBER" },
                    { "a955df00-6ea4-44d7-a053-b06e780c6a39", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6747e1cf-5715-4218-b42e-dd01a31ade33");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a955df00-6ea4-44d7-a053-b06e780c6a39");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "InteractingUserId",
                table: "Notifications",
                newName: "NewFollowerId");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "24ad5b74-4115-4eba-a21c-4f434e32188a", null, "Member", "MEMBER" },
                    { "9064ef1e-18f9-465b-be65-becc636a0991", null, "Admin", "ADMIN" }
                });
        }
    }
}
