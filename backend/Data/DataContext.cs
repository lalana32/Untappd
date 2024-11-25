using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext()
        {
        }
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
{
    base.OnModelCreating(builder);

    builder.Entity<IdentityRole>()
        .HasData(
            new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
            new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
        );

    builder.Entity<CheckIn>()
        .HasOne(c => c.User)
        .WithMany(u => u.CheckIns)
        .HasForeignKey(c => c.UserId)
        .OnDelete(DeleteBehavior.Cascade);


    builder.Entity<User>()
        .HasMany(u => u.CheckIns)
        .WithOne(c => c.User)
        .HasForeignKey(c => c.UserId)
        .OnDelete(DeleteBehavior.Cascade);

        
}

   

        

        public DbSet<Beer> Beers { get; set; }
        public DbSet<CheckIn> CheckIns { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Comment> Comments {get; set;}
       

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=store.db");

       
    }
    }

