/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var incrvmr = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof incrvmr, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns an accumulator function', function test( t ) {
	t.equal( typeof incrvmr(), 'function', 'returns a function' );
	t.end();
});

tape( 'the function returns an accumulator function (known mean)', function test( t ) {
	t.equal( typeof incrvmr( 3.0 ), 'function', 'returns a function' );
	t.end();
});

tape( 'the function throws an error if provided a non-numeric value', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		true,
		false,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			incrvmr( value );
		};
	}
});

tape( 'the accumulator function incrementally computes a variance-to-mean ratio', function test( t ) {
	var expected;
	var actual;
	var data;
	var acc;
	var i;

	data = [ 2.0, 3.0, 2.0, 4.0, 3.0, 4.0 ];

	// Test against Julia:
	expected = [
		0.0/(2.0/1.0),
		0.5/(5.0/2.0),
		0.33333333333333337/(7.0/3.0),
		0.9166666666666666/(11.0/4.0),
		0.7/(14.0/5.0),
		0.8/(18.0/6.0)
	];

	acc = incrvmr();

	actual = new Array( data.length );
	for ( i = 0; i < data.length; i++ ) {
		actual[ i ] = acc( data[ i ] );
	}
	t.deepEqual( actual, expected, 'returns expected results' );
	t.end();
});

tape( 'the accumulator function incrementally computes a variance-to-mean ratio (known mean)', function test( t ) {
	var expected;
	var actual;
	var data;
	var acc;
	var i;

	data = [ 2.0, 3.0, 2.0, 4.0, 3.0, 4.0 ];

	// Test against Julia:
	expected = [
		1.0/3.0,
		0.5/3.0,
		0.6666666666666666/3.0,
		0.75/3.0,
		0.6/3.0,
		0.6666666666666666/3.0
	];

	acc = incrvmr( 3.0 );

	actual = new Array( data.length );
	for ( i = 0; i < data.length; i++ ) {
		actual[ i ] = acc( data[ i ] );
	}
	t.deepEqual( actual, expected, 'returns expected results' );
	t.end();
});

tape( 'if not provided an input value, the accumulator function returns the current variance-to-mean ratio', function test( t ) {
	var data;
	var acc;
	var i;

	data = [ 2.0, 3.0, 1.0 ];
	acc = incrvmr();
	for ( i = 0; i < data.length; i++ ) {
		acc( data[ i ] );
	}
	t.equal( acc(), 1.0/2.0, 'returns expected value' );
	t.end();
});

tape( 'if not provided an input value, the accumulator function returns the current variance-to-mean ratio (known mean)', function test( t ) {
	var data;
	var acc;
	var i;

	data = [ 2.0, 3.0, 1.0 ];
	acc = incrvmr( 2.0 );
	for ( i = 0; i < data.length; i++ ) {
		acc( data[ i ] );
	}
	t.equal( acc(), 0.6666666666666666/2.0, 'returns expected value' );
	t.end();
});

tape( 'the accumulated value is `null` until at least 1 datum has been provided (unknown mean)', function test( t ) {
	var acc;
	var D;

	acc = incrvmr();

	D = acc();
	t.equal( D, null, 'returns null' );

	D = acc( 3.0 );
	t.notEqual( D, null, 'does not return null' );

	D = acc();
	t.notEqual( D, null, 'does not return null' );

	t.end();
});

tape( 'the accumulated value is `null` until at least 1 datum has been provided (known mean)', function test( t ) {
	var acc;
	var D;

	acc = incrvmr( 3.0 );

	D = acc();
	t.equal( D, null, 'returns null' );

	D = acc( 3.0 );
	t.notEqual( D, null, 'does not return null' );

	D = acc();
	t.notEqual( D, null, 'does not return null' );

	t.end();
});

tape( 'the accumulated value is `0` until at least 2 datums have been provided (unknown mean)', function test( t ) {
	var acc;
	var D;

	acc = incrvmr();

	D = acc( 2.0 );
	t.equal( D, 0.0, 'returns 0' );

	D = acc();
	t.equal( D, 0.0, 'returns 0' );

	D = acc( 3.0 );
	t.notEqual( D, 0.0, 'does not return 0' );

	D = acc();
	t.notEqual( D, 0.0, 'does not return 0' );

	t.end();
});

tape( 'if provided a `NaN`, the accumulator function returns `NaN` for all future invocations (unknown mean)', function test( t ) {
	var data;
	var acc;
	var v;
	var i;

	data = [ NaN, 2.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0 ];
	acc = incrvmr();
	for ( i = 0; i < data.length; i++ ) {
		v = acc( data[ i ] );
		t.equal( isnan( v ), true, 'returns expected value' );
		t.equal( isnan( acc() ), true, 'returns expected value' );
	}
	t.equal( isnan( acc() ), true, 'returns expected value' );
	t.end();
});

tape( 'if provided a `NaN`, the accumulator function returns `NaN` for all future invocations (known mean)', function test( t ) {
	var data;
	var acc;
	var v;
	var i;

	data = [ NaN, 2.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0 ];
	acc = incrvmr( 3.14 );
	for ( i = 0; i < data.length; i++ ) {
		v = acc( data[ i ] );
		t.equal( isnan( v ), true, 'returns expected value' );
		t.equal( isnan( acc() ), true, 'returns expected value' );
	}
	t.equal( isnan( acc() ), true, 'returns expected value' );
	t.end();
});
