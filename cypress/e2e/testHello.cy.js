describe("Update Analytics hybrid", () => {
    it("Update Analytics hybrid", () => {
        // Visit the URL
        Cypress.on("uncaught:exception", (err, runnable) => {
            // Returning false here prevents Cypress from failing the test when there's an exception
            return false;
        });

        cy.visit(
            "https://secure.konimbo.co.il/admin/user_files?q=Enhanced+Analytics+%28GA4%29+-+%D7%90%D7%A0%D7%9C%D7%99%D7%98%D7%99%D7%A7%D7%A1&search_field=&user_type=&device_type=&created_days=&layout_title="
        );

        cy.get("#user_session_username").invoke("val", "devkoni_yaronshop");

        cy.get("#user_session_password").invoke("val", "PASSWORD");

        cy.get("form#new_user_session").submit();

        cy.url().should(($url) => {
            // Decode the current URL
            const decodedUrl = decodeURIComponent($url);
            // Check that the decoded URL includes the expected part
            expect(decodedUrl.replaceAll("+", " ")).to.include("Enhanced Analytics (GA4) - אנליטיקס");
        });

        cy.get('a[href*="/admin/user_files"][href*="edit"]')
            .contains("Enhanced Analytics (GA4) - אנליטיקס")
            .then(($el) => {
                // Check if the element exists and navigate to its URL
                if ($el.length > 0) {
                    const href = $el.attr("href");
                    cy.visit("https://secure.konimbo.co.il" + href);
                }
            });

            const configXML = `<vars>
            <permission>
                <tabpermit>
                    <tab><name>ראשי</name><tab>ראשי</tab><user>all-permission</user></tab>
                    <tab><name>Events</name><tab>ראשי</tab><user>all-permission</user></tab>
                    <tab><name>אירועים מותאמים אישית</name><tab>ראשי</tab><user>all-permission</user></tab>
                    <tab><name>פנימי</name><tab>ראשי</tab><user>konimbo-admin-permission</user></tab>
                </tabpermit>
            </permission>
            
            <var>
                <label>name_token</label>
                <name>name_token</name>
                <value>enhanced_ecommerce_ga4</value>
                <tab>ראשי</tab>
                <group/>
                <tip/>
                <type>hidden</type>
            </var>
            <var>
                <label>admin_public</label>
                <name>admin_public</name>
                <value>true</value>
                <tab>ראשי</tab>
                <group/>
                <tip/>
                <type>hidden</type>
            </var>
            
            <var>
                <label>Measurement ID/ מזהה מדידה</label>
                <name>measurement_id</name>
                <type>text</type>
                <value></value>
                <tab>ראשי</tab>
                <tip>*אם לא יוגדר, ונבחר לא להשתמש בתג מנג'ר - המידע לא יישלח לאנליטיקס
                המזהה יהיה בפורמט הבא: G-XXXXXXXX
                *אם אתם לא יודעים מה המזהה שלכם אתם יכולים למצוא אותו לפי המדריך "הזה":https://konimbo.freshdesk.com/support/solutions/articles/4000186613-%D7%90%D7%99%D7%9A-%D7%9C%D7%9E%D7%A6%D7%95%D7%90-%D7%90%D7%AA-%D7%9E%D7%96%D7%94%D7%94-%D7%94%D7%9E%D7%93%D7%99%D7%93%D7%94-%D7%91%D7%92%D7%95%D7%92%D7%9C-%D7%90%D7%A0%D7%9C%D7%99%D7%98%D7%99%D7%A7%D7%A1-4
                *על מנת שהאנליטיקס שלכם יוכל לעקוב אחרי ההמרות (רכישות) באתר נדרש לבצע הגדרות מסוימות בממשק האנליטיקס 4 שלכם לפי המדריך "הזה":https://konimbo.freshdesk.com/support/solutions/articles/4000185955-%D7%94%D7%95%D7%A8%D7%90%D7%95%D7%AA-%D7%94%D7%92%D7%93%D7%A8%D7%94-%D7%A9%D7%9C-%D7%97%D7%A9%D7%91%D7%95%D7%9F-%D7%92%D7%95%D7%92%D7%9C-%D7%90%D7%A0%D7%9C%D7%99%D7%98%D7%99%D7%A7%D7%A1-4-%D7%9C%D7%94%D7%AA%D7%90%D7%9E%D7%AA-%D7%A2%D7%91%D7%95%D7%93%D7%94-%D7%A2%D7%9D-%D7%90%D7%AA%D7%A8%D7%99-%D7%A7%D7%95%D7%A0%D7%99%D7%9E%D7%91%D7%95</tip>
            </var>
            <var>
                <label>שימוש בתג מנג’ר</label>
                <name>use_tag_manager</name>
                <type>select</type>
                <value>false</value>
                <option><value>true</value><text>כן</text></option>
                <option><value>false</value><text>לא</text></option>
                <tab>ראשי</tab>
                <tip>צריך להיות מוטמע תג מנג’ר בחנות, ומוגדר בהתאם לאיוונטים שבהיברידי</tip>
            </var>
            <var>
                <label>מטבע החנות</label>
                <name>currency</name>
                <type>select</type>
                <value>ILS</value>
                <option><value>ILS</value><text>ש"ח</text></option>
                <option><value>USD</value><text>דולר</text></option>
                <option><value>EUR</value><text>אירו</text></option>
                <tab>ראשי</tab>
                <tip/>
            </var>
            <var>
                <label>ערך עבור מזהה המוצר</label>
                <name>item_id</name>
                <type>select</type>
                <value>konimbo_id</value>
                <option><value>konimbo_id</value><text>מזהה במערכת קונימבו</text></option>
                <option><value>sku</value><text>מק"ט</text></option>
                <tab>ראשי</tab>
                <tip/>
            </var>
            <var>
                <label>רשימה של דפי סינון</label>
                <name>filters_list</name>
                <type>select</type>
                <value>filter</value>
                <option><value>filter</value><text>כשם הסינון</text></option>
                <option><value>category</value><text>כשם הקטגוריה</text></option>
                <tab>ראשי</tab>
                <tip>איך יוגדר הפרמטר list של מוצרים המוצגים בדפי הסינון באתר</tip>
            </var>
            
            <var>
                <label>צפייה ברשימת מוצרים</label>
                <name>view_item_list</name>
                <type>select</type>
                <value>true</value>
                <option><value>false</value><text>לא פעיל</text></option>
                <option><value>true</value><text>פעיל</text></option>
                <tab>Events</tab>
                <tip/>
            </var>
            <var>
                <label>לחיצה על מוצר ברשימה</label>
                <name>select_item</name>
                <type>select</type>
                <value>true</value>
                <option><value>false</value><text>לא פעיל</text></option>
                <option><value>true</value><text>פעיל</text></option>
                <tab>Events</tab>
                <tip>קליק על מוצר ברשימה</tip>
            </var>
            <var>
                <label>צפייה בדף מוצר</label>
                <name>view_item</name>
                <type>select</type>
                <value>true</value>
                <option><value>false</value><text>לא פעיל</text></option>
                <option><value>true</value><text>פעיל</text></option>
                <tab>Events</tab>
                <tip/>
            </var>
            <var>
                <label>הוספה/הסרה של מוצרים מהעגלה</label>
                <name>add_remove_item</name>
                <type>select</type>
                <value>true</value>
                <option><value>false</value><text>לא פעיל</text></option>
                <option><value>true</value><text>פעיל</text></option>
                <tab>Events</tab>
                <tip></tip>
            </var>
            <var>
                <label>תהליך התשלום</label>
                <name>checkout</name>
                <type>select</type>
                <value>true</value>
                <option><value>false</value><text>לא פעיל</text></option>
                <option><value>true</value><text>פעיל</text></option>
                <tab>Events</tab>
                <tip>*יש לאפשר עבור כך את ההגדרה הרלוונטית בממשק של Google Analytics</tip>
            </var>
            <var>
                <label>רכישה</label>
                <name>purchase</name>
                <type>select</type>
                <value>true</value>
                <option><value>false</value><text>לא פעיל</text></option>
                <option><value>true</value><text>פעיל - צד לקוח (ברירת מחדל)</text></option>
                <option><value>serverside</value><text>פעיל - צד שרת (יש צורך בהתקנה נוספת)</text></option>
                <tab>Events</tab>
                <tip/>
            </var>
            
            
            <var>
                <label>section</label>
                <name>section_note</name>
                <type>section</type>
                <value>*שימו לב! השדות הבאים רלוונטיים רק למי שעובד בלי תג מנג'ר</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>section</label>
                <name>section_note2</name>
                <type>section</type>
                <value>אירועי קליק - *כל אירוע יופעל בלחיצה על האלמנט שיוגדר בשדה סלקטור של אותו אירוע</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
        
            <var>
                <label>section</label>
                <name>section_custom1</name>
                <type>section</type>
                <value>אירוע 1</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event1</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event1</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors</group>
                <tip></tip>
            </var>
        
            <var>
                <label>section</label>
                <name>section_custom2</name>
                <type>section</type>
                <value>אירוע 2</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event2</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event2</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom3</name>
                <type>section</type>
                <value>אירוע 3</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event3</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event3</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom4</name>
                <type>section</type>
                <value>אירוע 4</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event4</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event4</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom5</name>
                <type>section</type>
                <value>אירוע 5</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event5</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event5</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom6</name>
                <type>section</type>
                <value>אירוע 6</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event6</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event6</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom7</name>
                <type>section</type>
                <value>אירוע 7</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event7</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event7</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom8</name>
                <type>section</type>
                <value>אירוע 8</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event8</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event8</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom9</name>
                <type>section</type>
                <value>אירוע 9</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event9</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event9</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom10</name>
                <type>section</type>
                <value>אירוע 10</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event10</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event10</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors</group>
                <tip></tip>
            </var>
            
            
            <var>
                <label>section</label>
                <name>section_note2</name>
                <type>section</type>
                <value>אירועי שליחת טופס - *כל אירוע יופעל בשליחה של טופס שיוגדר בשדה סלקטור של אותו אירוע</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom_submit1</name>
                <type>section</type>
                <value>אירוע 1</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event1</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names_submit</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event1</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors_submit</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom_submit2</name>
                <type>section</type>
                <value>אירוע 2</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event2</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names_submit</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event2</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors_submit</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom_submit3</name>
                <type>section</type>
                <value>אירוע 3</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event3</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names_submit</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event3</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors_submit</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom_submit4</name>
                <type>section</type>
                <value>אירוע 4</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event4</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names_submit</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event4</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors_submit</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom_submit5</name>
                <type>section</type>
                <value>אירוע 5</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event5</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names_submit</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event5</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors_submit</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom_submit6</name>
                <type>section</type>
                <value>אירוע 6</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event6</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names_submit</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event6</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors_submit</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom_submit7</name>
                <type>section</type>
                <value>אירוע 7</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event7</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names_submit</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event7</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors_submit</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom_submit8</name>
                <type>section</type>
                <value>אירוע 8</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event8</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names_submit</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event8</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors_submit</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom_submit9</name>
                <type>section</type>
                <value>אירוע 9</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event9</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names_submit</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event9</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors_submit</group>
                <tip></tip>
            </var>
            
            <var>
                <label>section</label>
                <name>section_custom_submit10</name>
                <type>section</type>
                <value>אירוע 10</value>
                <tab>אירועים מותאמים אישית</tab>
                <tip></tip>
            </var>
            <var>
                <label>שם האירוע</label>
                <name>event10</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_names_submit</group>
                <tip></tip>
            </var>
            <var>
                <label>סלקטור</label>
                <name>event10</name>
                <type>text</type>
                <value></value>
                <tab>אירועים מותאמים אישית</tab>
                <group>custom_event_selectors_submit</group>
                <tip></tip>
            </var>
            
            
            <var>
                <label>לינק לקובץ V2 מוצרים</label>
                <name>v2_items_url</name>
                <type>text</type>
                <value></value>
                <tab>פנימי</tab>
                <tip></tip>
            </var>
            
            <css>
            #content tr[class^=section] td.label.small {
                font-size: 20px;
                font-weight: bold;
                background: #cadfe6;
            }
            #content tr.section_note td.label.small {
                background: none;
                color: #c40000;
            }
            #content tr.section_note2 td.label.small {
                background: none;
                font-size: 16px;
            }
            #content div.box ul.ui-widget-header > li:not(:nth-child(n+5)) {
                background-color: #c0eeff;
            }
            #content div.box ul.ui-widget-header > li:not(:nth-child(n+5)).ui-state-active {
                background-color: #e3f8ff;
            }
            #content div.box ul.ui-widget-header > li:not(:nth-child(n+4)) {
                background-color: #83e080;
            }
            #content div.box ul.ui-widget-header > li:not(:nth-child(n+4)).ui-state-active {
                background-color: #dfffde;
            }
            </css>
        </vars>`;

        cy.get("textarea#user_file_set_config_xml").invoke("val", configXML);
        cy.get("form.edit_user_file").submit();
    });
});
