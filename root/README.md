# fcoo-maps-{%= name %}
>{%= description %}


## Description
This package is used for...

## Installation
### bower
`bower install https://github.com/FCOO/fcoo-maps-{%= name %}.git --save`

## Demo
http://FCOO.github.io/fcoo-maps-{%= name %}/demo/

## Usage

    window.fcoo.map.createApplication(
        //options
        {
            applicationName: {da:'Overskrift', en:'Header'},
            leftMenu       : {isLayerMenu: true, width: 350},
        },

        //layerMenu
        [ "{%= menu_id %}" ]    //<===
    );


<!-- ### options
| Id | Type | Default | Description |
| :--: | :--: | :-----: | --- |
| options1 | boolean | true | If <code>true</code> the ... |
| options2 | string | null | Contain the ... |


### Methods

    .methods1( arg1, arg2,...): Do something
    .methods2( arg1, arg2,...): Do something else

 -->

## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/fcoo-maps-{%= name %}/LICENSE).

Copyright (c) {%= year %} [FCOO](https://github.com/FCOO)

## Contact information

{%= author_name %} {%= author_email %}

