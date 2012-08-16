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

        it("renders whole numbers", function() {
            ratio(42).should.equal(42)
            ratio(42).toString().should.equal("42")
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

    describe("Arithmetic", function() {

        describe("Reciprocal", function() {

            it("returns the reciprocal of the ratio", function() {
                ratio(1/2).reciprocal().should.equal(2)
                ratio(3/7).reciprocal().should.equal(ratio(7/3))
                ratio(9/3).reciprocal().toString().should.equal("1/3")
            })

            it("returns Infinity for the reciprocal of 0", function() {
                ratio(0).reciprocal().should.equal(Infinity)
            })
        })

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

        describe("Division", function() {

            it("behaves reasonably with primitive division", function() {
                (ratio(1,2) / ratio(1,4)).should.equal(2)
            })

            it("can divide by ratios", function() {
                ratio(1,2).div(ratio(3,5)).toString().should.equal("5/6")
            })

            it("can divide by (n,d) pair representing a ratio", function() {
                ratio(1,2).div(3,5).toString().should.equal("5/6")
            })

            it("can divide by integers", function() {
                ratio(1,3).div(2).toString().should.equal("1/6")
            })

            it("can divide by decimals", function() {
                ratio(1,3).div(0.4).toString().should.equal("5/6")
            })

            it("automatically reduces the result of division", function() {
                ratio(2,3).div(4,3).toString().should.equal("1/2")
            })
        })

        describe("Negatives", function() {

            it("can be negative", function() {
                ratio(-1,2).toString().should.equal("-1/2")
            })
            it("distributes negatives to the numerator", function() {
                ratio(1,-2).toString().should.equal("-1/2")
            })
            it("cancels out negatives", function() {
                ratio(-1,-2).toString().should.equal("1/2")
            })
            it("can be negated", function() {
                ratio(1,2).neg().toString().should.equal("-1/2")
            })
        })

        describe("Addition", function() {

            it("behaves reasonably with primitive addition", function() {
                (ratio(1,2) + ratio(1,4)).should.equal(0.75)
            })

            it("can add ratios", function() {
                ratio(1,7).plus(ratio(2,7)).toString().should.equal("3/7")
            })

            it("can add (n,d) pair representing a ratio", function() {
                ratio(1,7).plus(2,7).toString().should.equal("3/7")
            })

            it("can add integers", function() {
                ratio(1).plus(2).toString().should.equal("3")
            })

            it("can add decimals", function() {
                ratio(1,4).plus(0.75).toString().should.equal("1")
            })

            it("can add with different bases", function() {
                ratio(2,3).plus(1,6).toString().should.equal("5/6")
            })
        })

        describe("Subtraction", function() {

            it("behaves reasonably with primitive subtraction", function() {
                (ratio(1,2) - ratio(1,4)).should.equal(0.25)
            })

            it("can subtract ratios", function() {
                ratio(4,7).minus(ratio(1,7)).toString().should.equal("3/7")
            })

            it("can subtract (n,d) pair representing a ratio", function() {
                ratio(4,7).minus(1,7).toString().should.equal("3/7")
            })

            it("can subtract integers", function() {
                ratio(7).minus(4).toString().should.equal("3")
            })

            it("can subtract decimals", function() {
                ratio(4,5).minus(0.2).toString().should.equal("3/5")
            })

            it("can subtract with different bases", function() {
                ratio(2,3).minus(1,6).toString().should.equal("1/2")
            })
        })
    })
})
