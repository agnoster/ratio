# ratio - ℚ in JS [![build status](https://secure.travis-ci.org/agnoster/ratio.png?branch=master)](http://travis-ci.org/agnoster/ratio)

Sometimes you want to handle a ratio as its own entity. Yeah, you could downcast to decimal (though on floating point that's really a crime), or encode it as a string, but neither of those really cuts it.

So why not `npm install ratio`?

```js
var ratio = require('ratio')
  , half = ratio(4,8)

half === 0.5 // true
half.toString() === '1/2' // true
ratio(0.02).toSring() === '1/50'
```

## features

* flexible instantiation:
  * from numerator and denominator
  * from string
  * from decimal number
* nice rendering
  * `valueOf()` returns numeric form
  * `toString()` renders fractional form
* automatically reduces fractions on creation
* fraction arithmetic
  * addition with `r.plus(x)`
  * subtraction with `r.minus(x)`
  * multiplication with `r.times(x)`
  * division with `r.div(x)`
  * reciprocal with `r.reciprocal()`
  * negative with `r.neg()`

## still to come

* render unicode fractions?
