describe("getNasaCenter", function() {
    describe("Get Nasa Centre URL from Centre Initials", function() {
        it("It should return JPL url", function() {
            var result = getNasaCenter("JPL")
            expect(result).toBe("https://www.nasa.gov/centers/jpl/home/index.html")
        });
        it("It should return JSC url", function() {
            var result = getNasaCenter("JSC")
            expect(result).toBe("https://www.nasa.gov/centers/johnson/home/index.html")
        });
        it("It should return ARC url", function() {
            var result = getNasaCenter("ARC")
            expect(result).toBe("https://www.nasa.gov/ames")
        });
        it("It should return GSFC url", function() {
            var result = getNasaCenter("GSFC")
            expect(result).toBe("https://www.nasa.gov/goddard")
        });
        it("It should return KSC url", function() {
            var result = getNasaCenter("KSC")
            expect(result).toBe("https://www.nasa.gov/centers/kennedy/home/index.html")
        });
        it("It should return MSFC url", function() {
            var result = getNasaCenter("MSFC")
            expect(result).toBe("https://www.nasa.gov/centers/marshall/home/index.html")
        });
        it("It should return HQ url", function() {
            var result = getNasaCenter("HQ")
            expect(result).toBe("https://www.nasa.gov/centers/hq/home/index.html")
        });
        it("It should return GRC url", function() {
            var result = getNasaCenter("GRC")
            expect(result).toBe("https://www.nasa.gov/centers/glenn/home/index.html")
        });
        it("It should return LRC url", function() {
            var result = getNasaCenter("LRC")
            expect(result).toBe("https://www.nasa.gov/langley")
        });
        it("It should return AFRC url", function() {
            var result = getNasaCenter("AFRC")
            expect(result).toBe("https://www.nasa.gov/centers/armstrong/home/index.html")
        });
    });
});

//------------------

describe("splitDate", function() {
    describe("Get date components form 2015-10-31", function() {
        it("It should return {year: '2015', month: '10', day: '31'}", function() {
            var result = splitDate("2015-10-31", 0)
            expect(result).toEqual({ year: "2015", month: "10", day: "31" })
        });
        it("It should return {year: '2015', month: 'October', day: '31'}", function() {
            var result = splitDate("2015-10-31", 1)
            expect(result).toEqual({ year: "2015", month: "October", day: "31" })
        });        
    });
});


//------------------

describe("dscovrDistance", function() {
    describe("Get distance from coords", function() {
        it("It should return 148653299", function() {
            var result = dscovrDistance(1369514.38358, 340216.540237, 304757.805862, 135998314.92302, 58228275.399883, 25241919.575161)
            expect(result).toEqual(148653299)
        });
    });
});