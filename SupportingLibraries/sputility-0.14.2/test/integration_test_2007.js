(function($) {
   /*
    * For testing integration with SharePoint 2013
    */

   module("Main");

   test("The static function to get SPFields is available.", function() {
      ok(SPUtility.GetSPField);
      ok($);
   });

   test("Throw an error when trying to get a field that does not exist", function() {
      throws(
              function() {
                 SPUtility.GetSPField('foo bar');
              },
              "Unable to get a SPField named foo bar",
              "Correct error was thrown"
              );
   });

   module("SPTextField", {
      setup: function() {
         this.field = SPUtility.GetSPField('Title');
      }
   });

   test("Get the field", function() {
      expect(3);
      ok(this.field, "Object is returned");
      strictEqual(this.field.Type, "SPFieldText", "Type is SPFieldText");
      ok(this.field.Textbox, "Textbox property is set");
   });

   test("Get and set the value", function() {
      expect(1);

      var expected = 'foo bar';
      this.field.SetValue(expected);

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Textbox.");
   });

   test("MakeReadOnly()", function() {
      expect(1);

      var expected = 'foo bar';
      this.field.SetValue(expected);
      this.field.MakeReadOnly();

      ok('make read only ok');
   });


   module("SPNumberField", {
      setup: function() {
         this.field = SPUtility.GetSPField('Number');
      }
   });

   test('GetSPField()', function() {
      expect(3);
      ok(this.field, "Object is returned");
      strictEqual(this.field.Type, "SPFieldNumber", "Type is SPFieldNumber");
      ok(this.field.Textbox, "Textbox property is set");
   });

   test("SetValue() and GetValue()", function() {
      expect(1);

      var expected = 42;
      this.field.SetValue(expected);

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Textbox.");
   });

   module("SPCurrencyField", {
      setup: function() {
         this.field = SPUtility.GetSPField('Currency');
      }
   });

   test('GetSPField()', function() {
      expect(3);
      ok(this.field, "Object is returned");
      strictEqual(this.field.Type, "SPFieldCurrency", "Type is SPFieldCurrency");
      ok(this.field.Textbox, "Textbox property is set");
   });

   test("SetValue() and GetValue()", function() {
      expect(1);

      var expected = 42;
      this.field.SetValue(expected);

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Textbox.");
   });

   module("SPFieldChoice - Dropdown", {
      setup: function() {
         this.field = SPUtility.GetSPField('Dropdown Choice');
      }
   });

   test('GetSPField()', function() {
      expect(3);
      ok(this.field, "Object is returned");
      strictEqual(this.field.Type, "SPFieldChoice", "Type is SPFieldChoice");
      ok(this.field.Dropdown, "Dropdown property is set");
   });

   test("SetValue() and GetValue()", function() {
      expect(1);

      var expected = "Charlie";
      this.field.SetValue(expected);

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Textbox.");
   });
   
   test("Try setting the field to garbage (throws an exception)", function() {
      expect(1);
      
      throws(function(){
         this.field.SetValue("foo bar");
      });
   });
   
   module("SPFieldChoice Dropdown (with fill in)", {
      setup: function() {
         this.field = SPUtility.GetSPField('Dropdown Choice with Fill-in');
      }
   });

   test('GetSPField()', function() {
      expect(5);
      ok(this.field, "Object is returned");
      strictEqual(this.field.Type, "SPFieldChoice", "Type is SPFieldChoice");
      
      ok(this.field.Dropdown, "Dropdown property is set");
      ok(this.field.FillInElement, "Dropdown property is set");
      strictEqual(this.field.FillInAllowed, true, "FillInAllowed property is true.");
   });

   test("SetValue() and GetValue()", function() {
      expect(2);

      var expected = "Charlie";
      this.field.SetValue(expected);

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set dropdown.");

      expected = "foo bar";
      this.field.SetValue(expected);
      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set fill in value.");
   });
   
   module("SPFieldChoice - Radio buttons", {
      setup: function() {
         this.field = SPUtility.GetSPField('Radio Buttons');
      }
   });

   test('GetSPField()', function() {
      expect(5);
      ok(this.field, "Object is returned");
      strictEqual(this.field.Type, "SPFieldChoice", "Type is SPFieldChoice");
      
      ok(this.field.RadioButtons, "RadioButtons property is set");
      strictEqual(this.field.FillInAllowed, false, "FillInAllowed property is false.");
      strictEqual(
              this.field.RadioButtons.length,
              5,
              "RadioButtons property has 5 elements.");
   });

   test("SetValue() and GetValue()", function() {
      expect(1);

      var expected = "Charlie";
      this.field.SetValue(expected);

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Radio button.");
   });
   
   test("Try setting the field to garbage (throws an exception)", function() {
      expect(1);
      
      throws(function(){
         this.field.SetValue("foo bar");
      });
   });
   
   module("SPFieldChoice - Radio buttons with fill-in", {
      setup: function() {
         this.field = SPUtility.GetSPField('Radio Buttons with Fill-in');
      }
   });

   test('GetSPField()', function() {
      expect(5);
      ok(this.field, "Object is returned");
      strictEqual(this.field.Type, "SPFieldChoice", "Type is SPFieldChoice");
      
      ok(this.field.RadioButtons, "RadioButtons property is set");
      strictEqual(this.field.FillInAllowed, true, "FillInAllowed property is true.");
      strictEqual(
              this.field.RadioButtons.length,
              5,
              "RadioButtons property has 5 elements.");
   });

   test("SetValue() and GetValue()", function() {
      expect(1);

      var expected = "Charlie";
      this.field.SetValue(expected);

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Radio button.");
   });
   
   test("Set the fill-in value", function() {
      expect(2);
      
      var expected = "foo bar";
      this.field.SetValue(expected);
      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Radio fill-in choice.");
      strictEqual($(this.field.FillInTextbox).val(),
         expected,
         "Expect the fill-in textbox to be set correctly.");
   });

   module("SPFieldChoice - Checkboxes", {
      setup: function() {
         this.field = SPUtility.GetSPField('Checkboxes');
      }
   });

   test('GetSPField()', function() {
      expect(5);
      ok(this.field, "Object is returned");
      strictEqual(this.field.Type, "SPFieldMultiChoice", "Type is SPFieldMultiChoice");
      
      ok(this.field.Checkboxes, "Checkboxes property is set");
      strictEqual(this.field.FillInAllowed, false, "FillInAllowed property is false.");
      strictEqual(
              this.field.Checkboxes.length,
              5,
              "Checkboxes property has 5 elements.");
   });

   test("SetValue() and GetValue()", function() {
      expect(1);

      var expected = ["Alpha", "Charlie"];
      this.field.SetValue("Alpha", true);
      this.field.SetValue("Charlie", true);

      deepEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set the checkbox.");
   });
   
   test("Try setting the field to garbage (throws an exception)", function() {
      expect(1);
      
      throws(function(){
         this.field.SetValue("foo bar");
      });
   });

   module("SPFieldChoice - Checkboxes with Fill-in", {
      setup: function() {
         this.field = SPUtility.GetSPField('Checkboxes with Fill-in');
      }
   });

   test('GetSPField()', function() {
      expect(5);
      ok(this.field, "Object is returned");
      strictEqual(this.field.Type, "SPFieldMultiChoice", "Type is SPFieldMultiChoice");
      
      ok(this.field.Checkboxes, "Checkboxes property is set");
      strictEqual(this.field.FillInAllowed, true, "FillInAllowed property is true.");
      strictEqual(
              this.field.Checkboxes.length,
              5,
              "Checkboxes property has 5 elements.");
   });

   test("SetValue() and GetValue()", function() {
      expect(2);

      var expected = ["Alpha", "Charlie"];
      this.field.SetValue("Alpha", true);
      this.field.SetValue("Charlie", true);

      deepEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set the checkbox.");

      // pass a value to fill-in
      this.field.SetValue("foo bar");
      expected.push("foo bar");
      deepEqual(this.field.GetValue(),
              expected,
              "Fill-in value should be set now.");
   });

   module("SPFieldDateTime (date only)", {
      setup: function() {
         this.field = SPUtility.GetSPField('Date Only');
      }
   });

   test('GetSPField()', function() {
      expect(4);
      ok(this.field, "Object is returned");
      strictEqual(this.field.Type, "SPFieldDateTime", "Type is SPFieldDateTime");
      ok(this.field.DateTextbox, "Field has a date textbox");
      strictEqual(this.field.IsDateOnly, true, "IsDateOnly is true");
   });

   test("SetValue() takes individual date parameters", function() {
      expect(1);

      var expected = "08/15/2013 12:00AM";
      this.field.SetValue(2013, 8, 15);

      var actual = this.field.GetValue();
      equal(actual.toString(),
              expected,
              "SetValue sets the value to " + expected);
   });


   module("SPFieldDateTime (date and time)", {
      setup: function() {
         this.field = SPUtility.GetSPField('Date and Time');
      }
   });

   test('GetSPField()', function() {
      expect(6);
      ok(this.field, "Object is returned");
      strictEqual(this.field.Type, "SPFieldDateTime", "Type is SPFieldDateTime");
      ok(this.field.DateTextbox, "Field has a date textbox");
      ok(this.field.HourDropdown, "Field has a hour dropdown");
      ok(this.field.MinuteDropdown, "Field has a minute dropdown");
      strictEqual(this.field.IsDateOnly, false, "IsDateOnly is false");
   });

   test("SetValue() takes year, month, day, hour (str), and minute (str) parameters", function() {
      expect(1);

      var expected = "08/15/2013 8:30AM";
      this.field.SetValue(2013, 8, 15, '8 AM', '30');

      var actual = this.field.GetValue();
      equal(actual.toString(),
              expected,
              "SetValue sets the value to " + expected);
   });
   
   test("SetValue() takes year, month, day, hour (integer), and minute (str) parameters", function() {
      expect(1);

      var expected = "08/15/2013 8:30AM";
      this.field.SetValue(2013, 8, 15, 8, '30');

      var actual = this.field.GetValue();
      equal(actual.toString(),
              expected,
              "SetValue sets the value to " + expected);
   });
   
   test("SetValue() takes null or empty string to clear the field", function() {
      expect(8);

      var expected = "08/15/2013 1:45PM";
      this.field.SetValue(2013, 8, 15, '1 PM', '45');      
      var actual = this.field.GetValue();
      strictEqual(actual.toString(),
            expected,
            "SetValue() sets the value to 08/15/2013 1:45PM.");
      
      strictEqual(this.field.DateTextbox.value, '08/15/2013', "DateTextbox.value is 08/15/2013");
      strictEqual(this.field.HourDropdown.selectedIndex, 13, "HourDropdown.selectedIndex is 13");
      strictEqual(this.field.MinuteDropdown.selectedIndex, 9, "MinuteDropdown.selectedIndex is 9");
      
      expected = "";
      this.field.SetValue(null);
      actual = this.field.GetValue();
      strictEqual(actual.toString(),
            expected,
            "SetValue() clears out the date.");
      
      strictEqual(this.field.DateTextbox.value, '', "DateTextbox.value is empty string");
      strictEqual(this.field.HourDropdown.selectedIndex, 0, "HourDropdown.selectedIndex is 0");
      strictEqual(this.field.MinuteDropdown.selectedIndex, 0, "MinuteDropdown.selectedIndex is 0");
   });
   
   
   module("SPBooleanField (yes/no)", {
      setup: function() {
         this.field = SPUtility.GetSPField('Yes/No');
      }
   });

   test('GetSPField()', function() {
      expect(3);
      ok(this.field, "Object is returned");
      strictEqual(this.field.Type, "SPFieldBoolean", "Type is SPFieldBoolean");
      ok(this.field.Checkbox, "Checkbox property is set");
   });

   test("GetValue() and SetValue()", function() {
      expect(1);

      var expected = true;
      this.field.SetValue(true);

      var actual = this.field.GetValue();
      equal(actual,
              expected,
              "SetValue() didn't set the checkbox.");
   });
   
   module("SPURLField (hyperlink)", {
      setup: function() {
         this.field = SPUtility.GetSPField('Hyperlink');
      }
   });

   test('GetSPField()', function() {
      expect(4);
      ok(this.field, "Object is returned");
      strictEqual(this.field.Type, "SPFieldURL", "Type is SPFieldURL");
      ok(this.field.TextboxURL, "TextboxURL property is set");
      ok(this.field.TextboxDescription, "TextboxDescription property is set");
   });

   test("GetValue() and SetValue()", function() {
      expect(3);

      var expected = ['http://sputility.codeplex.com', 'SPUtility.js'];
      this.field.SetValue(expected[0], expected[1]);
      
      // make sure both textboxes were set correctly
      equal(this.field.TextboxURL.val(), expected[0], 'Test the url textbox is set correctly.');
      equal(this.field.TextboxDescription.val(), expected[1], 'Test the description textbox is set correctly.');
      
      // Gets the value of the hyperlink field as an array
      var actual = this.field.GetValue();
      deepEqual(actual, expected,
              "GetValue() should return an array of two strings containing URL and Description.");
   });
   
   module("SPLookupField (single-select, small lookup)", {
      setup: function() {
         this.field = SPUtility.GetSPField('Small Lookup');
      }
   });

   test('GetSPField()', function() {
      expect(2);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldLookup", "Wrong type: " + this.field.Type);
   });

   test("SetValue(string) takes a single string parameter to set by Text", function() {
      expect(1);

      var expected = 'Charlie';
      this.field.SetValue(expected);
      
      var actual = this.field.GetValue();
      strictEqual(actual, expected);
   });
   
   test("SetValue(number) takes a single number parameter to set by ID", function() {
      expect(1);

      var expected = 'Charlie';
      this.field.SetValue(3);
      
      var actual = this.field.GetValue();
      strictEqual(actual, expected);
   });
   
   module("SPLookupField (single-select, big lookup with autocomplete)", {
      setup: function() {
         this.field = SPUtility.GetSPField('Large Lookup Field');
      }
   });

   test('GetSPField()', function() {
      expect(3);
      ok(this.field, "Object is returned");
      strictEqual(this.field.Type, "SPFieldLookup", "Type is SPFieldLookup");
      // in SharePoint 2007, it depends on what browser you are using
      // for chrome, the field will display in a dropdown
      // for IE, the autocomplete functionality is used with a textbox
      ok(this.field.Textbox || this.field.Dropdown, "Textbox or Dropdown property is set");
   });
   
   test("SetValue(string) takes a single string parameter to set by Text", function() {
      expect(1);

      var expected = 'Charlie';
      this.field.SetValue(expected);
      
      var actual = this.field.GetValue();
      strictEqual(actual, expected);
   });
   
   test("SetValue(string) allows string values which have a pipe (|) character in their name", function() {
      expect(1);

      var expected = 'A Pipe | in the middle';
      this.field.SetValue(expected);
      
      var actual = this.field.GetValue();
      strictEqual(actual, expected);
   });
   
   test("SetValue(number) takes a single number parameter to set by ID", function() {
      expect(1);

      var expected = 'Charlie';
      this.field.SetValue(3);
      
      var actual = this.field.GetValue();
      strictEqual(actual, expected);
   });

   module("SPFieldNote (multi-line, plain text)", {
      setup: function() {
         this.field = SPUtility.GetSPField('Multi-line Plain Text');
      }
   });

   test('GetSPField()', function() {
      expect(3);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldNote");
      ok(this.field.Textbox, "Textbox property is set");
   });

   test("SetValue(string) takes a single string parameter", function() {
      expect(1);

      var expected = 'Hello world!';
      this.field.SetValue(expected);
      var actual = this.field.GetValue();
      strictEqual(actual, expected);
   });
   
   module("SPLookupMultiField", {
      setup: function() {
         this.field = SPUtility.GetSPField('Multi-Priority Lookup Field');
      }
   });

   test('GetSPField()', function() {
      expect(6);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldLookupMulti", "Expected type is SPFieldLookupMulti");
      ok(this.field.ListChoices, "Expected to have a property named ListChoices");
      ok(this.field.ListSelections, "Expected to have a property named ListSelections");
      ok(this.field.ButtonAdd, "Expected to have a property named ButtonAdd");
      ok(this.field.ButtonRemove, "Expected to have a property named ButtonRemove");
   });
   
   
   module("SPUserField", {
      setup: function() {
         this.field = SPUtility.GetSPField('Person or Group');
      }
   });

   test('GetSPField()', function() {
      expect(2);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldUser", "Wrong type: " + this.field.Type);
   });

   /* Unable to test People fields locally
    * test("Correct properties are set", function() {
      expect(2);
      ok(this.field.ClientPeoplePicker, 'ClientPeoplePicker property not set');
      ok(this.field.EditorInput, 'EditorInput property not set');
   });*/
   
   module("Miscellaneous tests");
   
   test('Splitting autocomplete choices', function() {
      expect(1);
      
      // a list item ID was passed to the function so attempt to lookup the text value
      var choices = '(None)|0|A pipe || in the middle|31|AAA BBB CCC|30|Alpha|1|Bravo|2|Charlie|3|Delta|4|Echo|5|Foxtrot|6|Golf|7|Hotel|8|India|9|Juliet|10|Kilo|11|Lima|12|Mike|13|November|14|Oscar|15|Papa|16|Quebec|17|Romeo|18|Sierra|19|Tango|29';
      var expected = [
         "(None)",
         "0",
         "A pipe || in the middle",
         "31",
         "AAA BBB CCC",
         "30",
         "Alpha",
         "1",
         "Bravo",
         "2",
         "Charlie",
         "3",
         "Delta",
         "4",
         "Echo",
         "5",
         "Foxtrot",
         "6",
         "Golf",
         "7",
         "Hotel",
         "8",
         "India",
         "9",
         "Juliet",
         "10",
         "Kilo",
         "11",
         "Lima",
         "12",
         "Mike",
         "13",
         "November",
         "14",
         "Oscar",
         "15",
         "Papa",
         "16",
         "Quebec",
         "17",
         "Romeo",
         "18",
         "Sierra",
         "19",
         "Tango",
         "29"
      ];
      
      // split the string on every pipe character followed by a digit
      choices = choices.split(/\|(?=\d+)/);
      var c = [], pipeIndex;
      c.push(choices[0]);
      for (var i = 1; i < choices.length - 1; i++) {
         pipeIndex = choices[i].indexOf('|'); // split on the first pipe only
         c.push(choices[i].substring(0, pipeIndex));
         c.push(choices[i].substring(pipeIndex+1));
      }
      c.push(choices[choices.length-1]);
      
      deepEqual(c, expected);
   });
   
}(jQuery));
