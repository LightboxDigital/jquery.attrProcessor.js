#jquery.attrProcessor.js#

##### Table of Contents
- [Description](#description)
- [How to install](#how-to-install)
- [How to use](#how-to-use)
- [Parameters](#parameters)
- [Feedback](#feedback)

==========
##Description##

This jQuery plugin is used to process javascript functions directly from data attributes in HTML. A lot of JS plugins have been lately having this logic by default such as Flickity & Match height - the issue with this is that your older/other scripts may not follow this logic and thus code can become disjointed.

With just one line of code this script allows you to map data attributes from the HTML into javascript functions, making for cleaner and more consistent code.

##How to install##

All you need to do is place the 'jquery.attrProcessor.js' file in a location of your choosing and then include it in the <head> of your document or before the closing </body> tag like:
```html
  <script type="text/javascript" src="/jquery.attrProcessor.js" />
```
Be sure to include jQuery first!

##How to use##

Once you have included jQuery and jquery.attrProcessor.js, you can initialise the processor by doing the following:

**__This example uses the popular bxSlider__**

```js
  $.processAttrFunction( 'bxSlider', 'slider', 'mode' );
```
We can then initialise bxSlider through our HTML like this

```html
    <div class="slider" data-slider>
        <div class="slide"></div>
    </div>
```

Hold on! Surely this is of no benefit to me? Why would I do that when I can just use the class?.. Well, you can do the following to change the sliders 'mode' value to 'horizontal'.

```html
    <div class="slider" data-slider="horizontal">
        <div class="slide"></div>
    </div>
```

If you want to set multiple options, you can just add further attributes!

```html
    <div class="slider" data-slider="horizontal" data-slider-auto="false" data-slider-touch-enabled="true">
        <div class="slide"></div>
    </div>
```

Now you might be thinking 'Hold on' again here, as bxSliders 'touch enabled' property is actually camelCased like most other jQuery plugins, why have you seperated it with a hyphen? It is for this reason that hyphenated attributes are automatically camelCased, so the above will pass the following to the 'bxSlider' function:

```js
{
    mode: 'horizontal',
    auto: false,
    touchEnabled: true
}
```

There are definitely cases when this will bloat your HTML, such as when there are a lot of options to pass in or even nested objects, it is for this reason that you can also pass a JSON object into the main data attribute and the processor will instead use that:

```html
    <div class="slider" data-slider='{"mode":"horizontal","touchEnabled":true}'>
        <div class="slide"></div>
    </div>
```
The above was very much inspired by flickity, and as such the same warnings apply:

> Options set in HTML must be valid JSON. Keys need to be quoted, for example "cellAlign":. Note that the attribute value uses single quotes ', but the JSON entities use double-quotes ".

See 'Parameters' below for further options.

##Parameters##

The attribute processor function expects at least 2 parameters, however 4 are available

```js
	$('[data-slider]').processAttrFunction(
        'bxSlider',     // Function for the processor to call
        'slider',       // Data attribute to match eg [data-slider]
        'mode',         // Default argument to parse main attribute into
        {mode: 'fade'}  // Set your own default arguments to merge into
    );
```

##Feedback##

We would love feedback on this, critisism would be well recieved and even appreciated! We use this internally at Lightbox and it streamlines our development workflow and as such any improvements we can make we will.

Pull requests would be greatly appreciated for any improvements, and please report any issues.

Feel free to contact the team on developers@lightboxcomms.co.uk to provide us with any feedback, or if you just fancy a chat.
