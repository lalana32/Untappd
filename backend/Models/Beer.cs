namespace backend.Models
{
    public class Beer
    {
        public int Id { get; set; } 

        public string? Name { get; set; }

        public string? Brewery { get; set; }

        public string? Type { get; set; }

        public double Abv { get; set; }

        public string? Description { get; set; }

        public string? Country { get; set; }

        public string? ImageUrl { get; set; }
        public ICollection<CheckIn>? CheckIns { get; set; }
    }
}
