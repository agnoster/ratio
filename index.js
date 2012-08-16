var gcd = require('gcd')

function ratio(n, d) {

    if (d === 0) {
        
        if (d > 0) return ratio.Infinity
        if (d < 0) return ratio.NInfinity
        return ratio.NaN
    }

    if (n instanceof Ratio) {
        
        if (d) return n.div(d)
        else return new Ratio(n.n, n.d)
    }

    return new Ratio(n, d)
}

function Ratio(n, d) {

    if (!d) {
        d = 1

        if (typeof n === "string") {
            var m
            if (m = n.match(/(\d+)\/(\d+)/)) {
                n = parseInt(m[1])
                d = parseInt(m[2])
            } else {
                n = parseFloat(n)
            }
        }

        if (typeof n === "number") {
            while (n > Math.floor(n)) {
                d *= 10
                n *= 10
            }
        }
    }

    if (!n) n = 0

    this.n = n
    this.d = d
    this.reduce()
}

Ratio.prototype =
{ numerator: function() { return this.n }
, denominator: function() { return this.d }
, toString: function() {

    return (this.d === 1) ? this.n : (this.n + "/" + this.d)
    }
, valueOf: function() {

    return this.n / this.d
    }
, reduce: function() {
        var g = Math.abs(gcd(this.n, this.d))
        if (this.d < 0) g = -g
        this.n /= g
        this.d /= g
    }
, reciprocal: function() {
        return ratio(this.d, this.n)
    }
, neg: function() {
        return ratio(-this.n, this.d)
    }
, times: function(x, d) {
        if (d) x = ratio(x, d)
        else x = ratio(x)

        return ratio(this.n * x.n, this.d * x.d)
    }
, div: function(x, d) {
        if (d) x = ratio(x, d)
        else x = ratio(x)

        return this.times(x.reciprocal())
    }
}

function SpecialRatio(n, d, overrides) {

    Ratio.call(this, n, d)

    this.special = true

    for (key in overrides) {
        this[key] = overrides[key]
    }
}

SpecialRatio.prototype = new Ratio(1)

ratio.Infinity = new SpecialRatio(1, 0, {
    
})

module.exports = ratio
