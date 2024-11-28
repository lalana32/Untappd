using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class NotificationUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "523fb942-1283-44e8-8e19-2796c19ec32a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "da08e8b2-f24f-44b1-874d-0c5fd62329b9");

            migrationBuilder.AddColumn<string>(
                name: "NewFollowerId",
                table: "Notifications",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "24ad5b74-4115-4eba-a21c-4f434e32188a", null, "Member", "MEMBER" },
                    { "9064ef1e-18f9-465b-be65-becc636a0991", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "24ad5b74-4115-4eba-a21c-4f434e32188a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9064ef1e-18f9-465b-be65-becc636a0991");

            migrationBuilder.DropColumn(
                name: "NewFollowerId",
                table: "Notifications");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "523fb942-1283-44e8-8e19-2796c19ec32a", null, "Member", "MEMBER" },
                    { "da08e8b2-f24f-44b1-874d-0c5fd62329b9", null, "Admin", "ADMIN" }
                });
        }
    }
}
