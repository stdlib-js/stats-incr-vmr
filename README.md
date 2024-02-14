<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# incrvmr

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Compute a [variance-to-mean ratio][variance-to-mean-ratio] (VMR) incrementally.

<section class="intro">

The [unbiased sample variance][sample-variance] is defined as

<!-- <equation class="equation" label="eq:unbiased_sample_variance" align="center" raw="s^2 = \frac{1}{n-1} \sum_{i=0}^{n-1} ( x_i - \bar{x} )^2" alt="Equation for the unbiased sample variance."> -->

```math
s^2 = \frac{1}{n-1} \sum_{i=0}^{n-1} ( x_i - \bar{x} )^2
```

<!-- <div class="equation" align="center" data-raw-text="s^2 = \frac{1}{n-1} \sum_{i=0}^{n-1} ( x_i - \bar{x} )^2" data-equation="eq:unbiased_sample_variance">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@7fe559e94716008fb414ec7c6b3d0e3e1194f2ba/lib/node_modules/@stdlib/stats/incr/vmr/docs/img/equation_unbiased_sample_variance.svg" alt="Equation for the unbiased sample variance.">
    <br>
</div> -->

<!-- </equation> -->

and the [arithmetic mean][arithmetic-mean] is defined as

<!-- <equation class="equation" label="eq:arithmetic_mean" align="center" raw="\bar{x} = \frac{1}{n} \sum_{i=0}^{n-1} x_i" alt="Equation for the arithmetic mean."> -->

```math
\bar{x} = \frac{1}{n} \sum_{i=0}^{n-1} x_i
```

<!-- <div class="equation" align="center" data-raw-text="\bar{x} = \frac{1}{n} \sum_{i=0}^{n-1} x_i" data-equation="eq:arithmetic_mean">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@86f8c49b0e95ee794f0b098b8d17444c0cbeea0a/lib/node_modules/@stdlib/stats/incr/vmr/docs/img/equation_arithmetic_mean.svg" alt="Equation for the arithmetic mean.">
    <br>
</div> -->

<!-- </equation> -->

The [variance-to-mean ratio][variance-to-mean-ratio] (VMR) is thus defined as

<!-- <equation class="equation" label="eq:variance_to_mean_ratio" align="center" raw="D = \frac{s^2}{\bar{x}}" alt="Equation for the variance-to-mean ratio (VMR)."> -->

```math
D = \frac{s^2}{\bar{x}}
```

<!-- <div class="equation" align="center" data-raw-text="D = \frac{s^2}{\bar{x}}" data-equation="eq:variance_to_mean_ratio">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@86f8c49b0e95ee794f0b098b8d17444c0cbeea0a/lib/node_modules/@stdlib/stats/incr/vmr/docs/img/equation_variance_to_mean_ratio.svg" alt="Equation for the variance-to-mean ratio (VMR).">
    <br>
</div> -->

<!-- </equation> -->

</section>

<!-- /.intro -->



<section class="usage">

## Usage

```javascript
import incrvmr from 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-vmr@v0.2.0-deno/mod.js';
```

#### incrvmr( \[mean] )

Returns an accumulator `function` which incrementally computes a [variance-to-mean ratio][variance-to-mean-ratio].

```javascript
var accumulator = incrvmr();
```

If the mean is already known, provide a `mean` argument.

```javascript
var accumulator = incrvmr( 3.0 );
```

#### accumulator( \[x] )

If provided an input value `x`, the accumulator function returns an updated accumulated value. If not provided an input value `x`, the accumulator function returns the current accumulated value.

```javascript
var accumulator = incrvmr();

var D = accumulator( 2.0 );
// returns 0.0

D = accumulator( 1.0 ); // => s^2 = ((2-1.5)^2+(1-1.5)^2) / (2-1)
// returns ~0.33

D = accumulator( 3.0 ); // => s^2 = ((2-2)^2+(1-2)^2+(3-2)^2) / (3-1)
// returns 0.5

D = accumulator();
// returns 0.5
```

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   Input values are **not** type checked. If provided `NaN` or a value which, when used in computations, results in `NaN`, the accumulated value is `NaN` for **all** future invocations. If non-numeric inputs are possible, you are advised to type check and handle accordingly **before** passing the value to the accumulator function.

-   The following table summarizes how to interpret the [variance-to-mean ratio][variance-to-mean-ratio]:

    |        VMR        |   Description   |     Example Distribution     |
    | :---------------: | :-------------: | :--------------------------: |
    |         0         |  not dispersed  |           constant           |
    | 0 &lt; VMR &lt; 1 | under-dispersed |           binomial           |
    |         1         |        --       |            Poisson           |
    |         >1        |  over-dispersed | geometric, negative-binomial |

    Accordingly, one can use the [variance-to-mean ratio][variance-to-mean-ratio] to assess whether observed data can be modeled as a Poisson process. When observed data is "under-dispersed", observed data may be more regular than as would be the case for a Poisson process. When observed data is "over-dispersed", observed data may contain clusters (i.e., clumped, concentrated data).

-   The [variance-to-mean ratio][variance-to-mean-ratio] is typically computed on nonnegative values. The measure may lack meaning for data which can assume both positive and negative values.

-   The [variance-to-mean ratio][variance-to-mean-ratio] is also known as the **index of dispersion**, **dispersion index**, **coefficient of dispersion**, and **relative variance**.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
import randu from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-base-randu@deno/mod.js';
import incrvmr from 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-vmr@v0.2.0-deno/mod.js';

var accumulator;
var v;
var i;

// Initialize an accumulator:
accumulator = incrvmr();

// For each simulated datum, update the variance-to-mean ratio...
for ( i = 0; i < 100; i++ ) {
    v = randu() * 100.0;
    accumulator( v );
}
console.log( accumulator() );
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/stats-incr/mean`][@stdlib/stats/incr/mean]</span><span class="delimiter">: </span><span class="description">compute an arithmetic mean incrementally.</span>
-   <span class="package-name">[`@stdlib/stats-incr/mvmr`][@stdlib/stats/incr/mvmr]</span><span class="delimiter">: </span><span class="description">compute a moving variance-to-mean ratio (VMR) incrementally.</span>
-   <span class="package-name">[`@stdlib/stats-incr/variance`][@stdlib/stats/incr/variance]</span><span class="delimiter">: </span><span class="description">compute an unbiased sample variance incrementally.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2024. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/stats-incr-vmr.svg
[npm-url]: https://npmjs.org/package/@stdlib/stats-incr-vmr

[test-image]: https://github.com/stdlib-js/stats-incr-vmr/actions/workflows/test.yml/badge.svg?branch=v0.2.0
[test-url]: https://github.com/stdlib-js/stats-incr-vmr/actions/workflows/test.yml?query=branch:v0.2.0

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/stats-incr-vmr/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/stats-incr-vmr?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/stats-incr-vmr.svg
[dependencies-url]: https://david-dm.org/stdlib-js/stats-incr-vmr/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/stats-incr-vmr/tree/deno
[deno-readme]: https://github.com/stdlib-js/stats-incr-vmr/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/stats-incr-vmr/tree/umd
[umd-readme]: https://github.com/stdlib-js/stats-incr-vmr/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/stats-incr-vmr/tree/esm
[esm-readme]: https://github.com/stdlib-js/stats-incr-vmr/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/stats-incr-vmr/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/stats-incr-vmr/main/LICENSE

[variance-to-mean-ratio]: https://en.wikipedia.org/wiki/Index_of_dispersion

[arithmetic-mean]: https://en.wikipedia.org/wiki/Arithmetic_mean

[sample-variance]: https://en.wikipedia.org/wiki/Variance

<!-- <related-links> -->

[@stdlib/stats/incr/mean]: https://github.com/stdlib-js/stats-incr-mean/tree/deno

[@stdlib/stats/incr/mvmr]: https://github.com/stdlib-js/stats-incr-mvmr/tree/deno

[@stdlib/stats/incr/variance]: https://github.com/stdlib-js/stats-incr-variance/tree/deno

<!-- </related-links> -->

</section>

<!-- /.links -->
