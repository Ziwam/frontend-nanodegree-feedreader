/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Loops through allFeeds and checks if urls are defined and aren't empty
        it('have URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        // Loops through allFeeds and checks if names are defined and aren't empty
        it('have Names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


   // Tests the visibility of side menu before and after icon clicks.
    describe('The menu', function() {
        var menu = $('body');
        var menuIcon = $('.menu-icon-link');
        
        // Checks if body element has "menu-hidden" class.
        it('is hidden by default', function() {
            expect(menu.hasClass('menu-hidden')).toBe(true);
        });

        it('is shown when icon is clicked', function() {
            // Triggers menu icon's click funciton
            menuIcon.click();
            expect(menu.hasClass('menu-hidden')).not.toBe(true);
        });

        it('is hidden when icon is clicked again', function() {
            menuIcon.click();
            expect(menu.hasClass('menu-hidden')).toBe(true);
        });
    });

    // Tests to see if entries are loaded into feed containers.
    describe('Initial Entries', function() {
        // Holds parent element to all entries.
        var container = $('.feed');

        beforeEach(function(done) {
            // Loads feed with loadFeed().
            loadFeed(0, function() {
                // Gets called after loadFeed() is done.
                done();
            });
        });

        it('are loaded into feed containers', function() {
            expect(container.find('.entry')).toBeDefined();
        });
    });

    // Tests the change of content after loadFeed() is called.
    describe('New Feed Selection', function() {
        // Holds the link of the first article after loadFeed() loads.
        var InitialArticleLink = null;
        
        beforeEach(function(done) {
            
            // Loads initial feed of index 0 with loadFeed().
            loadFeed(0, function() {
                InitialArticleLink = $('.entry-link').attr('href');

                // Loads new feed with loadFeed() given new index.
                loadFeed(1, function() {
                    done();
                });
            });
        });

        // Compares the link of the first article to the captured article, should not be the same.
        it('is loaded and causes content to change', function() {
            expect($('.entry-link').attr('href')).not.toBe(InitialArticleLink);
        });

    });
}());
