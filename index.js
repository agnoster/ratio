var gcd = require('gcd')

function Ratio(n, d) {

    if (!(this instanceof Ratio)) return new Ratio(n, d)

    if (n instanceof Ratio) return new Ratio(n.n, n.d)

    if (!d) {
        if (d === 0) return NaN
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
        var g = gcd(this.n, this.d)
        if (g > 1) {
            this.n /= g
            this.d /= g
        }
    }
}

module.exports = Ratio
