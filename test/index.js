var ratio = require('../')
  , should = require('should')

describe("Ratio", function() {

    describe("Argument parsing", function() {

        it("can be instantiated from numerator and denominator", function() {
            ratio(1,5).should.equal(0.2)
        })

        it("can be instantiated from just an integer", function() {
            ratio(23).should.equal(23)
        })

        it("can be instantiated from a decimal number", function() {
            ratio(0.5).toString().should.equal("1/2")
            ratio(0.02).toString().should.equal("1/50")
        })

        it("can be instantiated from a ratio", function() {
            ratio(ratio(1/2)).toString().should.equal("1/2")
        })

        it("is a different object when instantiated from another ratio", function() {
            var a = ratio(1/2)
              , b = ratio(a)
            a.is_a = true
            should.not.exist(b.is_a)
        })
    })

    describe("Edge cases", function() {

        it("returns Infinity when n > 0 and d = 0", function() {
            ratio(1,0).should.equal(Infinity)
        })
        it("returns -Infinity when n < 0 and d = 0", function() {
            ratio(-1,0).should.equal(-Infinity)
        })
        it("returns NaN when n and d are both 0", function() {
            var r = ratio(0, 0)
            should.equal(typeof r, "number")
            r.should.not.equal(r)
        })
    })

    describe("String parsing", function() {

        it("matches whole numbers", function() {
            ratio("10").should.equal(10)
        })

        it("matches simple fractions", function() {
            ratio("1/5").should.equal(0.2)
        })

        it("matches decimals", function() {
            ratio("0.2").toString().should.equal("1/5")
        })

        it("ignores non-numbers", function() {
            ratio("foobar").should.equal(0)
        })
    })

    describe("Rendering", function() {

        it("reduces to decimals", function() {
            ratio(1,2).should.equal(0.5)
        })

        it("renders as a ratio in a string", function() {
            ratio(3,4).toString().should.equal("3/4")
        })

        it("reduces automatically", function() {
            ratio(4,8).toString().should.equal("1/2")
        })

        it("is enumerable", function() {
            var half = ratio(1,2)
            , expected = {n:1, d:2}
            for (var key in half) {
                if (!half.hasOwnProperty(key)) continue
                half[key].should.equal(expected[key])
                delete expected[key]
            }
            expected.should.eql({})
        })

        it("can serialize to JSON", function() {
            JSON.stringify(ratio(4,8)).should.equal('{"n":1,"d":2}')
        })
    })

    describe("Math", function() {

        describe("Multiplication", function() {

            it("behaves reasonably with primitive multiplication", function() {
                (ratio(1,2) * ratio(1,4)).should.equal(ratio(1,8))
            })

            it("can multiply by ratios", function() {
                ratio(1,2).times(ratio(3,5)).toString().should.equal("3/10")
            })

            it("can multiply by (n,d) pair representing a ratio", function() {
                ratio(1,2).times(3,5).toString().should.equal("3/10")
            })

            it("can multiply by integers", function() {
                ratio(1,3).times(2).toString().should.equal("2/3")
            })

            it("can multiply by decimals", function() {
                ratio(1,3).times(0.4).toString().should.equal("2/15")
            })

            it("automatically reduces the result of multiplication", function() {
                ratio(2,3).times(3,4).toString().should.equal("1/2")
            })
        })
    })
})
