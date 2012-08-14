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
})