#for gui
import Tkinter
import tkFileDialog
import tkMessageBox

#for filename generator
import hashlib

#for httprequest
import urllib2
import os

#for regex
import re

class sctapp_tk(Tkinter.Tk):
    def __init__(self,parent):
        Tkinter.Tk.__init__(self,parent)
        self.parent = parent
        self.initialize()

    def initialize(self):
        self.grid()

        #label for team number
        labelTeam = Tkinter.Label(self, text="Valid Team Number: ")
        labelTeam.grid(column=0, row=0, sticky="EW")

        #input for team number
        self.inputTeam = Tkinter.Entry(self)
        self.inputTeam.grid(column=1, row=0, sticky="EW")
        self.inputTeam.bind("<Return>", self.OnEarlyEnterPress)

        #label for server address
        labelServerAddr = Tkinter.Label(self, text="Server Address: ")
        labelServerAddr.grid(column=0, row=1, sticky="EW")

        #input for server address, defaults to localhost for testing
        self.inputServerAddr = Tkinter.Entry(self)
        self.inputServerAddr.grid(column=1, row=1, sticky="EW")
        self.inputServerAddr.insert(0, 'https://laje.ru/frc-scout/api.php/')
        self.inputServerAddr.bind("<Return>", self.OnEarlyEnterPress)

        #label for text/document entry
        labelEntry = Tkinter.Label(self, text="Match Observation: ")
        labelEntry.grid(column=0, row=2, sticky="EW")

        #text area for record, OnEarlyEnterPress is not bound, since multiple lines are accepted.
        self.inputEntry = Tkinter.Text(self)
        self.inputEntry.config(width=48, height=12, borderwidth=0)
        self.inputEntry.grid(column=1, row=2, columnspan=1, sticky="EW")

        #offlineload button, invokes LoadOfflineData.
        buttonLoadOffline = Tkinter.Button(self, text=u"Load saved data", command=self.LoadOfflineData)
        buttonLoadOffline.grid(column=0, row=3, sticky="EW")

        #submission button, invokes OnSubmitAction.
        buttonSubmit = Tkinter.Button(self, text=u"Submit this entry", command=self.OnSubmitAction)
        buttonSubmit.grid(column=1, row=3, sticky="EW")

        #SaveOffline button, invokes SaveOfflineData.
        buttonSaveOffline = Tkinter.Button(self, text=u"Save to computer", command=self.SaveOfflineData)
        buttonSaveOffline.grid(column=0, row=4, sticky="EW")

        self.grid_columnconfigure(0,weight=1)
        self.resizable(False, False)
    
    def OnSubmitAction(self):
        #test to make sure the user has actually entered a valid address.
        #"either http or https, proceeded by colon slash slash, proceeded by any amount of characters, so long as the string terminates with a slash."
        testurl = re.search('(http|https)(:\/\/)(.*)(\/$)', self.inputServerAddr.get())
        if testurl:
            lines = self.inputEntry.get("1.0", "end-1c").replace(" ", "%20").split("\n")
            for i,words in enumerate(lines):
                self.HTTPSubmit(words)
        else: 
            if self.inputServerAddr.get() == "save": 
                self.SaveOfflineData()
            else:
                tkMessageBox.showinfo("Submission Error", "Either a valid server or the term \"save\" must be entered. \n\nA valid server address would be \n\"https://laje.ru/frc-scout/api.php\", with the https protocol and trailing slash included.")

    def OnEarlyEnterPress(self, event):
        event.widget.tk_focusNext().focus()
    
    def HTTPSubmit(self, words):
        #save just in case someone tries to submit without a connection to the server.
        self.SaveOfflineData()

        req = urllib2.urlopen(self.inputServerAddr.get() + 'writeg?team=5752&words=' + words)
        res = req.read()
        resd = re.search("{\"team\"\:\"(.*)(\",)\"entry\":\"(.*)(\"})", res)
        tkMessageBox.showinfo("Submission Successful", "Message " + resd.group(3) + " submitted for team " + resd.group(1))

        #if the submit succeeded, nice! delete that file. Othwewise, they'll have to forcequit but at least their data is backed up.
        self.RemoveOfflineData()

    def SaveOfflineData(self):
        #give the file a "unique name". It's just "save-[team#]-[first six chars of the inputs md5]"
        #this should be good enough to take care of all teams/multiple records per team if needed.
        file = open("save-" + self.inputTeam.get() + "-" + hashlib.md5(self.inputEntry.get("1.0", "end-1c")).hexdigest()[:6] + ".sct", "w+")
        file.write("_team:" + self.inputTeam.get() + "_data:" + self.inputEntry.get("1.0", "end-1c").replace("\n", "_br"))
        file.close()

    def RemoveOfflineData(self):
        os.remove("save-" + self.inputTeam.get() + "-" + hashlib.md5(self.inputEntry.get("1.0", "end-1c")).hexdigest()[:6] + ".sct")

    def LoadOfflineData(self):
        filepath = tkFileDialog.askopenfilename()
        loadedData = open(filepath, "r").read()

        #since the data is so simple, it's just saved as a string
        #just use this regexp to determine what's a team number and what's data
        #cg1->"_team:" indicator, cg2->team number, cg3->"_data:" indicator, cg4->text/entry
        found = re.search('(_team:)(.*)(_data:)(.*)', loadedData)

        self.inputTeam.delete(0, "end")
        self.inputTeam.insert(0, found.group(2))

        self.inputEntry.delete("1.0", "end")
        self.inputEntry.insert("1.0", found.group(4).replace("_br", "\n"))

if __name__ == "__main__":
    app = sctapp_tk(None)
    app.title('fscout#game_tk')
    app.mainloop()

