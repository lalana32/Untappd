using backend.Models;
using MongoDB.Driver;

namespace backend.Data
{
    public class DbInitializer
    {

         
        
        public static async Task Initialize(DataContext context)
        {
            


            if (context.Beers.Any())
            {
                return;
            }
            
                var beers = new Beer[]
                {
                    new Beer { Name = "Lagunitas IPA", Brewery = "Lagunitas Brewing Company", Type = "IPA", Abv = 6.2, Country = "United States", Description = "A well-balanced IPA with tropical and citrus hop flavors.", ImageUrl = "photos/beers/Lagunitas-Little-Sumpin'-Sumpin'-Ale.png"},
                    new Beer { Name = "Dogfish Head 90 Minute IPA", Brewery = "Dogfish Head Craft Brewery", Type = "Imperial IPA", Abv = 9.0, Country = "United States", Description = "A strong IPA with a complex hop character and a malt backbone.", ImageUrl = "photos/beers/Dogfish-Head-90-Minute-IPA.jpg"},
                    new Beer { Name = "Bell's Two Hearted Ale", Brewery = "Bell's Brewery", Type = "American IPA", Abv = 7.0, Country = "United States", Description = "An American IPA with pine and grapefruit flavors.", ImageUrl = "photos/beers/Bells-Two-Hearted-Ale.jpg" },
                    new Beer { Name = "Deschutes Black Butte Porter", Brewery = "Deschutes Brewery", Type = "Porter", Abv = 5.2, Country = "Germany", Description = "A smooth and roasty porter with chocolate and coffee notes.", ImageUrl = "photos/beers/Deschutes-Black-Butte-Porter.jpeg"},
                    new Beer { Name = "Green Flash West Coast IPA", Brewery = "Green Flash Brewing Co.", Type = "West Coast IPA", Abv = 7.0, Country = "Germany", Description = "A West Coast IPA with a hoppy and piney character.", ImageUrl = "photos/beers/Green-Flash-West-Coast-IPA.png"},
                    new Beer { Name = "Sierra Nevada Pale Ale", Brewery = "Sierra Nevada Brewing Co.", Type = "Pale Ale", Abv = 5.6, Country = "Spain", Description = "A classic pale ale with a balanced malt and hop profile.", ImageUrl = "photos/beers/Sierra-Nevada-Pale-Ale.png"},
                    new Beer { Name = "Sam Adams Boston Lager", Brewery = "Boston Beer Company", Type = "Lager", Abv = 5.0, Country = "United States", Description = "A well-rounded lager with a rich malt flavor.", ImageUrl = "photos/beers/Sam-Adams-Boston-Lager.jpg"},
                    new Beer { Name = "New Belgium Fat Tire", Brewery = "New Belgium Brewing Company", Type = "Amber Ale", Abv = 5.2, Country = "Belgium", Description = "A smooth amber ale with caramel malt and toasty notes.", ImageUrl = "photos/beers/New-Belgium-Fat-Tire.png"},
                    new Beer { Name = "Avery Brewing White Rascal", Brewery = "Avery Brewing Co.", Type = "Belgian White", Abv = 5.6, Country = "Belgium", Description = "A Belgian-style white ale with a fruity and spicy character.", ImageUrl = "photos/beers/Avery-Brewing-White-Rascal.png"},
                    new Beer { Name = "Founders Breakfast Stout", Brewery = "Founders Brewing Co.", Type = "Stout", Abv = 8.3, Country = "Germany", Description = "A robust stout brewed with coffee and chocolate.", ImageUrl = "photos/beers/Founders-Breakfast-Stout.png"},
                    new Beer { Name = "Ballast Point Sculpin IPA", Brewery = "Ballast Point Brewing Company", Type = "IPA", Abv = 7.0, Country = "France", Description = "A hoppy IPA with citrus and tropical fruit flavors.", ImageUrl = "photos/beers/Ballast-Point-Sculpin-IPA.jpg" },
                    new Beer { Name = "Oskar Blues Dale's Pale Ale", Brewery = "Oskar Blues Brewery", Type = "Pale Ale", Abv = 6.5, Country = "France", Description = "A full-bodied pale ale with a hoppy and citrusy character.", ImageUrl = "photos/beers/Oskar-Blues-Dale's-Pale-Ale.jpg"},
                    new Beer { Name = "Stone IPA", Brewery = "Stone Brewing Co.", Type = "IPA", Abv = 6.9, Country = "United States", Description = "An aggressively hopped IPA with a piney and floral aroma.", ImageUrl = "photos/beers/Stone-IPA.jpg" },
                    new Beer { Name = "Widmer Brothers Hefeweizen", Brewery = "Widmer Brothers Brewing", Type = "Hefeweizen", Abv = 4.9, Country = "Germany", Description = "A classic hefeweizen with banana and clove flavors.", ImageUrl = "photos/beers/Widmer-Brothers-Hefeweizen.jpeg"},
                    new Beer { Name = "Anchor Steam Beer", Brewery = "Anchor Brewing Company", Type = "California Common", Abv = 4.9, Country = "Belgium", Description = "A unique beer with a rich malt flavor and a distinctive steam beer character.", ImageUrl = "photos/beers/Anchor-Steam-Beer.jpg" },
                    new Beer { Name = "Elysian Space Dust IPA", Brewery = "Elysian Brewing Company", Type = "IPA", Abv = 8.2, Country = "Estonia", Description = "A hoppy IPA with tropical fruit and citrus notes.", ImageUrl = "photos/beers/Elysian-Space-Dust-IPA.png" },
                    new Beer { Name = "Cigar City Jai Alai IPA", Brewery = "Cigar City Brewing", Type = "IPA", Abv = 7.5, Country = "United States", Description = "A bold IPA with a strong hop flavor and a hint of caramel.", ImageUrl = "photos/beers/Cigar-City-Jai-Alai-IPA.png" },
                    new Beer { Name = "Brooklyn Lager", Brewery = "Brooklyn Brewery", Type = "Lager", Abv = 5.2, Country = "United States", Description = "A well-balanced lager with a malty sweetness and a crisp finish.", ImageUrl = "photos/beers/Brooklyn-Lager.png" },
                    new Beer { Name = "Firestone Walker 805", Brewery = "Firestone Walker Brewing Company", Type = "Blonde Ale", Abv = 4.7, Country = "United States", Description = "A light and refreshing blonde ale with subtle malt and hop notes.", ImageUrl = "photos/beers/Firestone-Walker-805.jpg" },
                    new Beer { Name = "Lagunitas Little Sumpin' Sumpin' Ale", Brewery = "Lagunitas Brewing Company", Type = "American Pale Wheat Ale", Abv = 7.5, Country = "United States", Description = "A pale wheat ale with a hoppy character and a smooth finish.", ImageUrl = "photos/beers/Lagunitas-Little-Sumpin'-Sumpin'-Ale.png" },
                    new Beer { Name = "Great Lakes Edmund Fitzgerald Porter", Brewery = "Great Lakes Brewing Co.", Type = "Porter", Abv = 6.0, Country = "Spain", Description = "A robust porter with roasted malt and coffee flavors.", ImageUrl = "photos/beers/Great-Lakes-Edmund-Fitzgerald-Porter.jpg" },
                    new Beer { Name = "Deschutes Mirror Pond Pale Ale", Brewery = "Deschutes Brewery", Type = "Pale Ale", Abv = 5.0, Country = "Germany", Description = "A classic pale ale with a balanced hop and malt profile.", ImageUrl = "photos/beers/Deschutes-Mirror-Pond-Pale-Ale.png" },
                    new Beer { Name = "Bell's Oberon Ale", Brewery = "Bell's Brewery", Type = "Wheat Ale", Abv = 5.8, Country = "United States", Description = "A fruity wheat ale with citrus and spice notes.", ImageUrl = "photos/beers/Bell's-Oberon-Ale.jpg" },
                    new Beer { Name = "Sierra Nevada Torpedo Extra IPA", Brewery = "Sierra Nevada Brewing Co.", Type = "IPA", Abv = 7.2, Country = "Spain", Description = "An extra IPA with a bold hop character and a malt backbone.", ImageUrl = "photos/beers/Sierra-Nevada-Torpedo-Extra-IPA.jpeg" },
                    new Beer { Name = "New Belgium Voodoo Ranger IPA", Brewery = "New Belgium Brewing Company", Type = "IPA", Abv = 7.0, Country = "Belgium", Description = "A hoppy IPA with tropical fruit and pine notes.", ImageUrl = "photos/beers/New-Belgium-Voodoo-Ranger-IPA.jpeg"},
                    new Beer { Name = "Stone RuinTen IPA", Brewery = "Stone Brewing Co.", Type = "IPA", Abv = 10.8, Country = "United States", Description = "A high-ABV IPA with a big hop character and a complex flavor profile.", ImageUrl = "photos/beers/Stone-RuinTen-IPA.png"},
                    new Beer { Name = "Avery Brewing Maharaja", Brewery = "Avery Brewing Co.", Type = "Imperial IPA", Abv = 10.0, Country = "United States", Description = "A powerful imperial IPA with a strong hop presence and a rich malt backbone.", ImageUrl = "photos/beers/Avery-Brewing-Maharaja.jpg"},
                    new Beer { Name = "BrewDog Punk IPA", Brewery = "BrewDog", Type = "IPA", Abv = 5.6, Country = "Scotland", Description = "A modern IPA with tropical fruit flavors and a hoppy finish.", ImageUrl = "photos/beers/BrewDog-Punk-IPA.jpg" },
                    new Beer { Name = "Founders All Day IPA", Brewery = "Founders Brewing Co.", Type = "Session IPA", Abv = 4.7, Country = "France", Description = "A session IPA with a hoppy character and a low ABV.", ImageUrl = "photos/beers/Founders-All-Day-IPA.jpeg"},
                    new Beer { Name = "Ballast Point Victory at Sea", Brewery = "Ballast Point Brewing Company", Type = "Imperial Porter", Abv = 10.0, Country = "United States", Description = "A rich and complex imperial porter with coffee and vanilla notes.", ImageUrl = "photos/beers/Ballast-Point-Victory-at-Sea.jpeg"}


                
                };

            foreach(var beer in beers)
            {
                context.Beers.Add(beer);
            }
            
             await context.SaveChangesAsync();
        }
    }
    
}