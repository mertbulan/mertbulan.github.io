---
title: My smart home setup with Raspberry Pi and Home Assistant
image: smart-home-home-app.png
---

![Home Asistant interface](/uploads/smart-home-home-assistant.png)

Sometimes laziness might help you to 'innovate'. At least, that is what happened when I was too lazy to get up and turn off the light that stands at the other corner of my room after I am done with reading my book on my bed. You know that feeling. You are so comfortable under your blanket, you just want to sleep, you don't have enough energy to do any movement but you have to turn off the light. This happened to me many times and in the end, I decided that it is time for making my lights 'smart'.

Of course, my laziness wasn't the only reason. I found out that by using smart radiator valves, I can save between 100-200€ per year. With this money, I can justify the money that I am going to spend on my setup, and later I can profit.

The smart home topic is nothing new but it is getting more common and the prices for the hardware are going down. There are some solutions from IKEA, Philips, etc. for smart home systems that you can buy and after a few minutes of configuration, they would be ready to use. But those setups are sometimes expensive and they are not as extendable and configurable as you want. For me there were only two criteria for my setup:

1. It should work without an internet connection
2. I should be able to extend it as much as I can (I don't want to be dependent on one brand)

After talking with a few friends, I decided to go with Raspberry Pi and Home Assistant solution for my smart home setup. In this blog post, I am going to share the details including the cost of my setup and my plans for it.

## Setup

### Hub

As I mentioned many times, as a hub, I decided to use Raspberry Pi. The important thing is here that since there are many Raspberry Pi versions, I picked the one that is suggested by [Home Assistant](https://www.home-assistant.io/getting-started/) and bought a Raspberry Pi 4 Model B (2GB). Besides Raspberry Pi itself, I also bought the official power supply and the case. Also, I needed to buy an SD Card for the Pi, for that, I bought SanDisk Extreme 64GB. The important thing that you need to keep in mind while buying an SD Card, you should buy an SD Card that has Application Class 2. This class is much better (comparing to Application Class 1) since we are going to run an application (Home Assistant) in it instead of just using it as storage. Lastly, to be able to connect devices that use the Zigbee standard, I bought [RaspBee](https://phoscon.de/en/raspbee) module.

The cost of the hub:

|Item|Price|
|----|-----|
|Raspberry Pi 4 Model B (2GB)|38,90€|
|Offical Power Supply|7,90€|
|Offical Case|5,95€|
|SanDisk Extreme 64GB|14,95€|
|RaspBee|39,95€|
|----|-----|
|**Total**|**107,65€**|

I am still not sure if that was a good idea to buy a Zigbee module since I connected only one sensor so far. Otherwise, the cost of the hub would be 67,70€.

### Devices

There is just one important piece of information here: if you are going to use Home Assistant like me, before buying a device, please check [Integrations](https://www.home-assistant.io/integrations/) page and make sure that you can connect to Home Assistant. If you want your devices to keep working without the internet, also check the `IoT class` of the device on the page and make sure that it is `Local Polling`.

#### Lights

As I mentioned in the beginning, one of my goals to have a smart home setup was being able to control my lights. To do that, I had two options: buying smart bulbs or buying a smart socket to connect my lambs. I wanted to go with the second option since I didn't have any plans to change the color of the light or the brightness. In the end, one for my sleeping room, one for my living room, I bought two [TP-Link HS100](https://www.amazon.de/-/en/TP-Link-HS100-EU-required-anywhere/dp/B06W586CDZ/) for 14,52€ each. I easily connected them to my WiFi via TP-Link's Kasa app and with [TP-Link Kasa Smart](https://www.home-assistant.io/integrations/tplink/) integration to my Home Assistant.

#### Heating

This is the most important part of the system because this is where I am going to save some money. Before sharing the device that I bought, I feel like I should mention how the heating system works in Germany.

In Germany, while paying your rent, you also pay the heating cost. (that's the reason why it is called warm rent) This is good because instead of paying a huge amount of money in the cold months, it is spread into 12 months so it is easier to pay. This cost is calculated based on the previous tenant's heating usage. I pay 40€ every month for heating my 38 square meters flat. There are 4 radiators in my flat and each radiator has [a device](https://www.brunata-metrona.de/site_data/user_upload/produkte/produkt/heizkostenverteiler/TELMETRIC_UEbersicht.jpg) to calculate how much energy I use. After one year, one person from the heating company comes to my flat (since the device can communicate wirelessly, the person doesn't need to enter the flat) and read the numbers from the device. After that they calculate how much energy I use during the year, if I use more than expected, my landlord asks me to pay the difference. If I use less than expected, my landlord pays back the difference.

The problem with the radiators, you just turn the valves one time and they stay like that for the whole cold months. (October, November, December, January, February, and March in Hamburg) You can of course adjust them every day based on the weather but this not very efficient. So you just leave them as they are until April. As you can guess, in this way you are wasting so much energy. Also if you are working like me and there is nobody at home during your working hours, you are heating your flat for nothing. Same for the time when you are sleeping, you are wasting energy in the other rooms.

Back to the device, I bought two [AVM FRITZ!DECK 301](https://www.amazon.de/-/en/Intelligent-Radiator-Controller-Network-Standard/dp/B076QK2PJV/) smart radiator controller, one for my living room and one for my sleeping room. I paid 43,99€ for each. Since I have a FRITZ! router, it was so easy to set up them with [AVM FRITZ!SmartHome](https://www.home-assistant.io/integrations/fritzbox/) integration. Besides controlling them on my Home Assistant, there is also an interface that you can configure some details like ideal temperature, when you want to turn on the heating, to which degree you want to keep the radiator while you are not actively heating, etc. So in the end, I configured my devices like:

- Set the temperature to 22 °C between 20:00-09:00 in my sleeping, otherwise 16 °C
- Set the temperature to 22 °C between 09:00-20:00 in my living room, otherwise 16 °C

![FRITZ interface](/uploads/smart-home-fritz-interface.png)

I have been using them like this since September and based on my calculations, I am expecting to get around 50€ back from my landlord from 480€ that I paid as heating cost. I also realized that I wasted so much energy at the beginning of the year because I just left the valves as they are for 4 months, but next year, I am expecting to get around 125€ back based on my calculations, but of course I am assuming that I am going to work from home until April. Otherwise, the money that I going to save would be around 175€ because there will be no reason to keep the temperature at 22 °C in my living room when I am at the office.


#### Sensor

In the beginning, I was planning to put a sensor in each room but then after buying the smart radiator controllers, I didn't see any reason to buy them because those controllers also show the current temperature in the rooms. I bought only one [Aqara Smart Temperature and Humidity Sensor](https://www.aqara.com/en/temperature_humidity_sensor.html) for 16,69€ and placed it in my kitchen. To be able to connect this sensor to the hub, I had to buy RaspBee as I mentioned before. With [deCONZ integration](https://www.home-assistant.io/integrations/deconz/), I easily connected to my Home Assistant setup.

#### Air

I have a pollen allergy and because of that, I bought a [Philips AC1214/10 Air Purifier](https://www.amazon.de/-/en/gp/product/B0792P6NMZ) for 235,04€ the last summer. It helps me to sleep well since it cleans all the pollens in my sleeping room. Normally, you have to use Air Matters app to control the device. There is no Home Assistant integration for the device but [someone on Github](https://github.com/shexbeer/philips-airpurifier) find a way to connect it to Home Assistant via HACS. I tried and I was also able to connect the device to my Home Assistant setup. On my Home Assistant dashboard, I can only turn on and off the device but it is possible to fetch the air quality data from the device with cURL. So maybe one day, me or the owner of the repo or someone else will add this support directly to Home Assistant and then I can use all the features of the device. For example, right now, you can't automatically turn on the device based on the air quality data. You get a notification if the air quality is not good (from Air Matters app) but you have to turn on the device yourself. If I can get the air quality data into Home Assistant, I can check it and turn on/off the device based on it.


## Integrations & Automations

![Home App](/uploads/smart-home-home-app.png)

Since I am an Apple user, I wanted to control my smart home setup via my iPhone, Mac, and of course with Siri. Home Assitant already has [HomeKit integration](https://www.home-assistant.io/integrations/homekit/) so I easily set up the integration and started to control my smart home on the Home app interface instead of the Home Assistant interface. (which I find more beautiful)

Now, it comes to the coolest part: automation. So far, I have 3 automation and 1 Scene on the Home app:

- Turn on the lights if I am at home AND the sunsets
- Turn off the lights if they are on AND I leave home
- Turn on the lights if they are off AND I arrive home

- Hey Siri, Good Night!: This scene turns off all the lights and the air purifier

Besides these, I can also turn on/off the lights, the air purifier, or the heating by using Siri. (Or I can ask for the temperature level in the rooms)

There is one funny moment that I have to mention. When I set the automation first time, while I was sleeping suddenly my lights turned on. I have to admit, I was scared a little bit. Then, I realized that my iPhone was updating itself. Since my smart home setup understands whether I am at home or not via checking my iPhone if it is connected to my WiFi or not, during the iOS update, my iPhone disconnected from the WiFi, then it is connected again and it triggered the automation. I fixed this issue by adding another rule: do not run this automation between 00:00-08:00. So it will never be triggered again while I am sleeping.

## What is next?

I am quite happy with the current state of my smart home setup but there are a few things that I would like to add in the future.

### Smart blinds

Currently, I have a simple IKEA blind in my sleeping room. I checked the smart blinds (also the one from IKEA) but didn't like them that much and also find them expensive. My idea is that I am going to make my current blind smart by adding a stepper motor and controlling it via Arduino. If I can manage to do that I would like to automate my blind and open and close it based on sunset/sunrise. I believe that it would help me to wake up easier.

### Air quality

The other thing that I want to do is keeping the air quality in my flat high. In winter, you have to open your windows regularly to get fresh air in your apartment. The problem is that if your heating is on, you can waste so much energy if you open your window without turning the heating off. The smart radiator controller that I bought has a button for window mode. You can press it and set a timer for 5/10/15 minutes and it turns off the radiator. After the time that you set passes, it turns on it again. The thing that I want to do is automating this process and also adding some rules.

First, I want to buy a CO2 sensor to measure the CO2 level in my flat. Then, I would like to open/close my windows automatically. So far, I couldn't find any solution for that. I might need to create something my own. Once I make my windows smart, I would like to set automation like this to keep the air quality high:

1. Check the CO2 level
2. If the CO2 level is high, open the windows and turn off the heater
3. Once the CO2 level is low, close the windows AND turn on the heater AND turn on the air purifier (to clean the fresh air from the particles)
4. Once the air quality data that comes from the air purifier is good, turn off the air purifier.

I believe that with this automation, the air quality in my flat would be high and I wouldn't need to think about it anymore. Everybody thinks about the quality of the food that we eat but not too many people think about the air that we breathe every second. I think the air quality is as important as the food that we eat and the only way to keep the level high is by measuring it and keeping it fresh with this kind of automation. It is going to be an expensive investment (you can check the price of CO2 sensors) but I think it is going to worth it.

### Cleaning

I have a Xiaomi Mijia 1C robot vacuum cleaner. It has a scheduling feature to clean my apartment at any giving time but, sometimes that schedule doesn't fit my schedule, especially since I am spending most of my time during the lockdown. So I need to run it manually all the time. The thing that I want to do is running the cleaner when I leave my home but I guess once we get back to normal, I can schedule to run it when I am at the office.