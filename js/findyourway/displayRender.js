/* displayRender.js
 *
 * Copyright (C) 2018 Dimitris Kardarakos <dimkard@gmail.com>, KDE.
 *
 * Authors:
 *   Dimitris Kardarakos <dimkard@gmail.com>
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program; if not, see <http://www.gnu.org/licenses/>.
 */

(function($) {

    var DisplayRender = {
        language: 'en',

        addHelpers: function () {
            Handlebars.registerHelper('choice_info', function() {

                var choiceType= Handlebars.escapeExpression(this.type);
                if(choiceType === "node") {
                    var nextGroup= Handlebars.escapeExpression(this.nextGroup);
                    var choiceText = Handlebars.escapeExpression(this.choiceText);
                    return new Handlebars.SafeString("next-group='"+nextGroup+ "'>"+ choiceText);
                }
                else if(choiceType === "leaf") { 
                    var target= Handlebars.escapeExpression(this.target);
                    var choiceId= Handlebars.escapeExpression(this.choiceId);
                    var description= Handlebars.escapeExpression(this.description);
                    var extraInfo= Handlebars.escapeExpression(this.extraInfo);
                    var choiceHeader = "target='"+target+"' data-choice-id='"+ choiceId + "'>"+description;
                    var choiceExtraInfo = "";
                    if (extraInfo) {
                        choiceExtraInfo = "<div class='extra'>" + extraInfo + "</div>";
                    }
                    
                    return new Handlebars.SafeString(choiceHeader+choiceExtraInfo);
                }
                });
            
            Handlebars.registerHelper('group_info', function() {
                var groupid= Handlebars.escapeExpression(this.groupid);
                var groupquestion = Handlebars.escapeExpression(this.groupquestion);
                return new Handlebars.SafeString("id='"+groupid+ "'><span class='question'>"+groupquestion+"</span>");
                });
        }
        ,
        renderTemplate: function() {
    //      NON-PRECOMPILED DEPLOYMENT: var source   = document.getElementById("group-template").innerHTML;
    //      NON-PRECOMPILED DEPLOYMENT: var template = Handlebars.compile(source);
            var targetLang = DisplayRender.language;
            var context = DisplayRender.questionFlow[targetLang];
    //      NON-PRECOMPILED DEPLOYMENT: var html = template(context);
            var html = Handlebars.templates.way(context);
            //DEBUG console.log(html);
            $('#wrapper').prepend(html);
        }
        ,
        questionFlow: {
            en: {
                            groups: [
                                {
                                    groupid: "rootgroup",
                                    groupquestion: "What are the contribution areas you are the most interested in?",
                                    choices: [  
                                        {   
                                            type: "node",
                                            nextGroup: "system-dev" , 
                                            choiceText: "System Development"
                                        },
                                        {
                                            type: "node",
                                            nextGroup: "design" , 
                                            choiceText: "Design"                                    
                                        },
                                        {
                                            type: "node",
                                            nextGroup: "outreach" , 
                                            choiceText: "Outreach"                                    
                                        },
                                        {
                                            type: "node",
                                            nextGroup: "app-dev" , 
                                            choiceText: "Application development"                                    
                                        },                                    
                                    ]
                                },
                                {
                                    groupid: "design",
                                    groupquestion: "I am mostly interested in ",
                                    choices: [  
                                        {
                                            type: "leaf",
                                            target: "https://hig.kde.org/resources/contribute.html",
                                            choiceId: "target-kirigami-design",
                                            description: "Kirigami application design",
                                            extraInfo: "joining KDE Visual Design Group and desigining applications following the Kirigami Human Interface Guidelines"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://community.kde.org/Plasma/Mobile/Design",
                                            choiceId: "target-shell-design",
                                            description: "Shell and user interface design",
                                            extraInfo: "designing core Plasma Mobile user interface"
                                        },
                                    ]
                                },
                                {
                                    groupid: "app-dev",
                                    groupquestion: "So, let's pick a task to get started. What about",
                                    choices: [  
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T6945",
                                            choiceId: "target-camera",
                                            description: "Camera application",
                                            extraInfo: "working on the camera application with support for taking picture and recording videos?"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T6942",
                                            choiceId: "target-calendar",
                                            description: "Calendar application",
                                            extraInfo: "working on a calendar application, offering reminders and agenda functionalities?"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T6935",
                                            choiceId: "target-dialer",
                                            description: "Dialer application",
                                            extraInfo: "working on the dialer application, providing an interface for managing phone calls?"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T6936",
                                            choiceId: "target-sms",
                                            description: "SMS application",
                                            extraInfo: "working on the SMS application, offering functionalities like reading, sending and receiving of SMS?"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T6937",
                                            choiceId: "target-contact-book",
                                            description: "Contact book application",
                                            extraInfo: "working on the contact book application, integrating Plasma Mobile with contacts of the KPeople backends?"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T8900",
                                            choiceId: "target-calculator",
                                            description: "Calculator application",
                                            extraInfo: "working on the calculator application, providing simple arithmetic operations and scientific calculations to Plasma Mobile users?"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T8901",
                                            choiceId: "target-weather",
                                            description: "Weather application",
                                            extraInfo: "working on the utility that allows the users to monitor the current weather in their location and offers them detailed forecasts?"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T8902",
                                            choiceId: "target-browser",
                                            description: "Web Browser",
                                            extraInfo: "developing a lightweight  browser that is optimized for usage in mobile devices?"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T8904",
                                            choiceId: "target-clock",
                                            description: "Clock",
                                            extraInfo: "working on the standalone clock, alarm, stopwatch and timer application?"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T8906",
                                            choiceId: "target-qr-scanner",
                                            description: "QR code scanner",
                                            extraInfo: "working on the application that enables the users to scan QR codes?"
                                        },
                                    {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T8903",
                                            choiceId: "target-audio-recorder",
                                            description: "Audio Recorder",
                                            extraInfo: "creating a simple application with a clean interface to offer fast and easy sound recording?"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T8905",
                                            choiceId: "target-compass",
                                            description: "Compass",
                                            extraInfo: "working on the compass application that will use the GPS and the sensors of the mobile device?"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T8961",
                                            choiceId: "target-flashlight",
                                            description: "Flashlight",
                                            extraInfo: "creating a simple flashlight application?"
                                        }
                                    ]
                                },
                                
                                {
                                    groupid: "system-dev",
                                    groupquestion: "So, let's pick a task to get started. What about",
                                    choices: [  
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T6940",
                                            choiceId: "target-ringtone",
                                            description: "Ringtone and Notifications",
                                            extraInfo: "working on controls and options for ringtones and call and message notifications?"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T6946",
                                            choiceId: "target-usb-mtp",
                                            description: "USB-MTP storage support",
                                            extraInfo: "providing USB/MTP storage support to Plasma Mobile devices?"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T8907",
                                            choiceId: "target-bluetooth",
                                            description: "Bluetooth",
                                            extraInfo: "porting Plasma bluetooth capabilities to Plasma Mobile?"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T8908",
                                            choiceId: "target-battery",
                                            description: "Battery",
                                            extraInfo: "providing battery usage schemes per application as well as battery condition and energy consumption reporting?"
                                        },
                                        {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T8909",
                                            choiceId: "target-cell-buttons",
                                            description: "Cell Buttons",
                                            extraInfo: "enabling the user to configure the action of each device button?"
                                        },
                                    {
                                            type: "leaf",
                                            target: "https://phabricator.kde.org/T8910",
                                            choiceId: "target-gestures",
                                            description: "Gestures",
                                            extraInfo: "creating the configuration infrastructure that will enable the users to match actions against gestures?"
                                        }
                                    ]
                                },
                            {
                                    groupid: "outreach",
                                    groupquestion: "I am mostly interested in",
                                    choices: [  
                                        {
                                            type: "leaf",
                                            choiceId: "target-doc",
                                            target: "https://phabricator.kde.org/T4946",
                                            description: "Writting documentation",
                                            extraInfo: "documenting Plasma Mobile architecture, installation process, applications, etc."
                                        },
                                        {
                                            type: "leaf",
                                            choiceId: "target-promo",
                                            target: "https://community.kde.org/Promo",
                                            description: "Promotion",
                                            extraInfo: "joining KDE Promo team and promoting Plasma Mobile"
                                        }                                
                                    ]
                            }                            
                            ]
                }
        }
    }

    DisplayRender.addHelpers();
    DisplayRender.renderTemplate();
    $('#responses div').show();
})(window.jQuery);
