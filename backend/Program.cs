using System.Text;
using System.Text.Json.Serialization;
using backend;
using backend.Data;
using backend.Models;
using backend.Services;
using backend.Services.Auth;
using backend.Services.Beers;
using backend.Services.Follower;
using backend.Services.Notifications;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;


var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<IBeerService, BeerService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IFollowerService, FollowerService>();
builder.Services.AddScoped<ICheckInService, CheckInService>();
builder.Services.AddScoped<INotificationService, NotificationService>();

builder.Services.AddAutoMapper(typeof(MapperProfile).Assembly);
builder.Services.AddHttpContextAccessor();



// In Program.cs or Startup.cs
builder.Services.AddControllers().AddJsonOptions(options =>
{
    // Example: Ignore reference loops (similar to what Newtonsoft.Json does)
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;

    // Optional: Pretty-print JSON responses
    options.JsonSerializerOptions.WriteIndented = true;
});


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var jwtSecurityScheme=new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        Reference= new OpenApiReference{
            Id=JwtBearerDefaults.AuthenticationScheme,
            Type=ReferenceType.SecurityScheme
        }
    };
    c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
         jwtSecurityScheme,Array.Empty<string>()   
        }
    });
});


builder.Services.AddDbContext<DataContext>(options =>
        options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<DataContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

// Registracija TokenService-a
builder.Services.AddScoped<TokenService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyMethod()
              .AllowAnyHeader()
              .WithOrigins("http://localhost:5173") // Add your frontend origin here
              .AllowCredentials(); // Allow credentials if needed
    });
});

var app = builder.Build();


app.UseHttpsRedirection();
// app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5173").SetIsOriginAllowed(origin => true).AllowCredentials());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.UseStaticFiles();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<DataContext>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();


{
    try
    {
        await context.Database.MigrateAsync();
        await DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        throw new Exception("Error: ", ex);
    }
}

app.Run();
