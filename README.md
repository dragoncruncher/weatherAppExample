# Weather App Example

Cypress implementation of example tests for the weather app.

## Instructions for installation
1. Clone the repo locally
2. In the root folder, use the command 
* npm install
3. Make sure you have Chrome :)

## Instructions for execution
There are two options:

**To run Cypress interactively, use the command**
* _npm run openCypress_

When Cypress has opened, select one of the feature files. This will open the browser and execute the scenarios.


**To run Cypress and have it close on test completion, use the command**
* _npm run runTests_

### Notes
1. On first run the SUT takes a little while to warm up and my cause failures;
2. Given the scenarios I've chosen, there is one genuine test failure when running the integrated scenarios :)

## Why have I made the choices demonstrated?
I've used Cypress a little whilst looking at options to help focus the automated checking we use in the team. Looking at the exercise, this seemed like a good opportunity to refresh myself with Cypress and extend it with first, a Cucumber implementation to meet the BDD requirements and second to use the inline stubbing capability to demonstrate an option for removing the backend as a dependency for the checks, which is a consideration when integrating browser checks in a CI pipeline.

Once we remove the backend and have complete control of the data that's returned back to the application, we can the start to look at other alternatives to assertions on specific dom elements. In this case I've gone with a snapshot extension to Cypress which reduces the complexity of the code, whilst increasing the coverage of the markup. 

## Suppose you want to run some of these tests in a development pipeline that's independent from the backend development pipeline. Explain how you would approach this:

### What techniques, frameworks or tools you might think of using?

In the project I've provided an example of a technique and tools that you might use to help achieve a level of UI coverage of the application, without a direct dependency on the back end. Take a look at the 'weatherAppMocked' feature file and the 'weatherCheckedMockedSteps' step definition file.

If the front end is built independently of the back end, then we can focus entirely on the front end logic and presentation. By doing so we move away from testing 'through the UI' to focussing more on 'testing the UI', becoming far more interested in the markup and user interactions. To do this we must look to stub out any dependencies that exist outside of the application. You can achieve this in many ways, but depending on the testability of the application, your options may be limited. In this case I've chosen a test framework which provides the capability to hijack requests and responses at execution time. As well as the advantage of keeping the application intact, covering all of the application dependencies including the http layer, this approach means that we do not need to make changes to the application in order for it to become testable. If you were to chose a framework that doesn't allow you to do this so easily, you may find yourself having to provide that capability by creating an environment which is fully or partially stubbed, through CNAME/DNS records or a hosted proxy, redirecting calls to stubs hosted on a service such as GetSandbox. Alternatively you could use the application's configuration to point all or some of the service calls to stubbed end points.

Now that we have total control of the data returned to the application, we can use a fairly cheap and powerful techniques such as snapshots. Snapshots provide us with a quick and relatively easy way to compare two pieces of data. In the example I've provied, we've stubbed the response from the API to provide specific data. As this response is now fully deterministic, we know exactly how the application should render the weather details. This allows us to take a snapshot of the dom at the appropriate level, in this case I've chosen the table body tbody element and its children. Creating a snapshot of what good looks like, I can now make some changes to the application, run this check and be told if the structure and rendering of that part of the dom has changed in a way I wasn't expecting. I've now moved away from the temptation to iterate over all of the table rows and cells, or if that's too scary, I may have even chosen to only pick out a certain number of properties. By using snapshots I've covered all of the parts of the dom I care about, in one go. 

There are some trade offs with this approach. Firstly, I've now totally decoupled the application from its api dependency. In doing so I run the risk of thinking everying in my application is working fine, whilst the API team have gone and changed the contract. You can mitigate this risk by using contract tests which are specifically designed to help build confidence in your stubbing assumptions, or you can have a smaller set of fully integrated checks. Another trade off is that the snapshot has to be correct. If you create the snapshot and it's incorrect but matches the behaviour of your application, then you risk being told everything is ok but the reality is it is not. 

One other consideration is that you don't necessarily need to have the application running in order for you to take advantage of snapshot tests. Using Jest & Enzyme together, you can shallow render the virtual dom of a React application, focussing on specific components in specific states. This removes the dependencies of the rest of the application and makes them even faster, which is a great advantage for the developer feedback/debugging loop.

### How would you go about integrating this framework with a CI pipeline?

Taking CI in its explicit sense, you want your CI feedback loop to be as fast as possible and unlikely to break for annoying reasons such as lack of network, missing/broken dependencies and services or timeouts/slow responses, which result in test failures. I also take CI to mean that there's no deployment phase, therefore all of your tests are going to need to be able to run on the build agent (assuming you're using something like TeamCity or Jenkins). This rules out a whole host of testing activities which you might normally expect to run to cover the risks to your application. 

Cypress is one of the more demanding browser test frameworks when it comes to the CI pipeline. As it comes with it's own application, there are more requirements for installation than you might normally have, if you were using something like Nightwatch or Webdriver.io and running checks on a hosted service such as SauceLabs. In this case I'd expect a UI checking step in your pipeline, following all of your unit, component & snapshot tests. Part 1 of the step would be to install the necessary dependencies on to the build agent. Hopefully you can reuse the same capability that you'd have used earlier when installing your unit other test frameworks or whatever was needed to build the application, you might just have to accept that it's going to take a little longer. The next part of the step is to execute the tests. Cypress can run headless and in parallel, improving the speed in which the checks execute. The final part of the step would be to take all of the test results and put them somewhere, along with any recordings and screenshots. 

And if it's your thing, why not get all of this set up in Docker? Cypress has Docker containers already built. I don't have much experience of this myself, but it's something we're looking in to in my current team. 