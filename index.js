var gcd = require('gcd')

function Ratio(n, d) {

    if (d === 0) return n/d

    if (!(this instanceof Ratio)) return new Ratio(n, d)

    if (n instanceof Ratio) return new Ratio(n.n, n.d)

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

    return (this.d === 1) ? this.n.toString() : (this.n + "/" + this.d)
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
        return Ratio(this.d, this.n)
    }
, neg: function() {
        return Ratio(-this.n, this.d)
    }
, times: function(x, d) {
        if (d) x = Ratio(x, d)
        else x = Ratio(x)

        return Ratio(this.n * x.n, this.d * x.d)
    }
, div: function(x, d) {
        if (d) x = Ratio(x, d)
        else x = Ratio(x)

        return this.times(x.reciprocal())
    }
, plus: function(x, d) {
        if (d) x = Ratio(x, d)
        else x = Ratio(x)

        return Ratio(this.n * x.d + x.n * this.d, this.d * x.d)
    }
, minus: function(x, d) {
        if (d) x = Ratio(x, d)
        else x = Ratio(x)

        return this.plus(x.neg())
    }
}

module.exports = Ratio
