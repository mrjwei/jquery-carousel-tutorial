$(function() {
  var $items = $(".carousel-item")
  var $prev = $("#prev")
  var $next = $("#next")
  var currentIndex = 0
  var nextIndex
  var $currentItem = $items.eq(currentIndex)
  // add this line
  var $indicatorWrapper = $(".indicator-wrapper")
  var interval

  // add this block to generate indicators
  // here we loop through each item because we want
  // the number of indicators to match that of items
  $items.each(function() {
    $indicatorWrapper.append("<li class='indicator'><button class='indicator-btn'></button></li>")
  })
  // add these 2 lines to make the first indicator active at first load
  var $indicators = $(".indicator-btn")
  $indicators.eq(currentIndex).addClass("active")

  // display the the first carousel item
  // when window loads for the first time
  $currentItem.css("left", 0)

  // as we'll need to get prev index at multiple places,
  // it's a good practice to extract the operations into a function for reuse
  // same reason for defining the getNextIndex function
  // this function is called when user clicked the prev button
  function getPrevIndex(initialIndex, currentIndex, maxIndex) {
    if (currentIndex === initialIndex) {
      return maxIndex
    } else {
      return currentIndex - 1
    }
  }

  // called when user clicked the next button
  function getNextIndex(initialIndex, currentIndex, maxIndex) {
    if (currentIndex === maxIndex) {
      return initialIndex
    } else {
      return currentIndex + 1
    }
  }

  // the core function that handles carousel movement
  // depending on the value of the optional direction argument,
  // the carousel moves forward or backward
  function moveCarousel(direction = "normal") {
    if (direction == "normal") {
      nextIndex = getNextIndex(0, currentIndex, $items.length - 1)
      $items.eq(currentIndex).animate({
        left: "-100%"
      }, 500, function() {
        $(this).css("left", "100%")
      })
      $items.eq(nextIndex).animate({
        left: 0
      }, 500)
    } else {
      nextIndex = getPrevIndex(0, currentIndex, $items.length - 1)
      $items.eq(nextIndex).css("left", "-100%")
      $items.eq(nextIndex).animate({
        left: 0
      }, 500)
      $items.eq(currentIndex).animate({
        left: "100%"
      }, 500)
    }
    $indicators.removeClass("active")
    $indicators.eq(nextIndex).addClass("active")

    currentIndex = nextIndex
  }

  interval = setInterval(function() {
    moveCarousel()
  }, 2000)

  // but when user clicked a button, prev or next, clear the interval and
  // handle the click event by moving carousel forward or backward
  // after the event is handled, get the interval back and
  // the carousel moves automatically again
  $prev.click(function() {
    clearInterval(interval)
    moveCarousel(direction = "reverse")

    interval = setInterval(function() {
    moveCarousel()
  }, 2000)
  })

  $next.click(function() {
    clearInterval(interval)
    moveCarousel()

    interval = setInterval(function() {
    moveCarousel()
  }, 2000)
  })
})