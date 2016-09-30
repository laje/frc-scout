<!DOCTYPE html>
<html>
<?php include('../allPages.php'); ?>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="https://fonts.googleapis.com/css?family=Ubuntu:400,400i" rel="stylesheet">
    <link href="style.css" rel="stylesheet">
</head>

<script src="pitJs.js"></script>

<body>
    <div id="container">
        <div class="action-card-body" id="add-robot">
            <div class="action-card-header">
                Add a Team's Robot
            </div>
            <div class="divider"></div>
            <div class="action-card-content" season="stronghold">
                <div class="action-card-subtitle" id="action-card-subtitle-offense">
                    Offense
                </div>
                <div class="divider short"></div>
                <div class="action-card-split-container">
                    <div class="action-card-subcontent" id="left-offense">
                        <div class="action-card-subtitle mini">
                            Shooting
                        </div>
                        <div class="options options-highgoal">
                            <div class="option-title">
                                Can this robot shoot the high goal?
                            </div>
                            <div class="options-container radio">
                                <div class="option-button radio options-yes" id="option-highgoal-yes" onclick="radioOption('highgoal', true)">
                                    Yes
                                </div>
                                <div class="option-button radio options-no" id="option-highgoal-no" onclick="radioOption('highgoal', false)">
                                    No
                                </div>
                            </div>
                            <form>
                                <!--0: no 1: yes 2: unspecified-->
                                <input type="hidden" id="option-highgoal" value=null>
                            </form>
                        </div>
                        <div class="options input-highgoal">
                            <div class="option-title">
                                How many shots can this robot consistently land on the high goal in a given match?
                            </div>
                            <form>
                                <!--0: no 1: yes 2: unspecified-->
                                <input type="number" class="variable-option" id="variable-highgoal" value="0" required>
                            </form>
                        </div>
                        <div class="options options-lowgoal">
                            <div class="option-title">
                                Can this robot shoot the low goal?
                            </div>
                            <div class="options-container radio">
                                <div class="option-button options-yes" id="option-lowgoal-yes" onclick="radioOption('lowgoal', true)">
                                    Yes
                                </div>
                                <div class="option-button options-no" id="option-lowgoal-no" onclick="radioOption('lowgoal', false)">
                                    No
                                </div>
                            </div>
                            <form>
                                <!--0: no 1: yes 2: unspecified-->
                                <input type="hidden" id="option-lowgoal" value="null">
                            </form>
                        </div>
                        <div class="options input-lowgoal">
                            <div class="option-title">
                                About how many boulders does this robot get into the low goal in a given match?
                            </div>
                            <form>
                                <!--0: no 1: yes 2: unspecified-->
                                <input type="number" class="variable-option" id="variable-lowgoal" value="0" required>
                            </form>
                        </div>
                        <div class="action-card-subtitle mini">
                            Additional Features
                        </div>
                        <div class="options input-features">
                            <div class="option-title">
                                What kind of wheels does this robot have?
                            </div>
                            <form>
                                <input type="text" class="variable-option wide" id="variable-wheels" required>
                            </form>
                        </div>
                        <div class="options input-features">
                            <div class="option-title">
                                This is just a proof of concept.
                            </div>
                            <form>
                                <input type="text" class="variable-option wide" id="variable-unk" value="These forms don't actually matter" readonly>
                            </form>
                        </div>
                    </div>
                    <div class="action-card-subcontent" id="right-offense">
                        <div class="action-card-subtitle mini">
                            Obstacles
                        </div>
                        <div class="options options-obstacle">
                            <div class="option-title">
                                Obstacle Slot 1
                            </div>
                            <div class="options-container">
                                <div class="option-button options-yes" id="option-portcullis" on="false" onclick="toggleOption('portcullis')">
                                    Portcullis
                                </div>
                                <div class="option-button options-yes" id="option-cheval" on="false" onclick="toggleOption('cheval')">
                                    Cheval de Frise
                                </div>
                            </div>
                            <form>
                                <input type="hidden" id="option-obstacle-portcullis" value="false">
                                <input type="hidden" id="option-obstacle-cheval" value="false">
                            </form>
                        </div>
                        <div class="options options-obstacle">
                            <div class="option-title">
                                Obstacle Slot 2
                            </div>
                            <div class="options-container">
                                <div class="option-button options-yes" id="option-moat" on="false" onclick="toggleOption('moat')">
                                    Moat
                                </div>
                                <div class="option-button options-yes" id="option-rampart" on="false" onclick="toggleOption('rampart')">
                                    Ramparts
                                </div>
                            </div>
                            <form>
                                <input type="hidden" id="option-obstacle-moat" value="false">
                                <input type="hidden" id="option-obstacle-rampart" value="false">
                            </form>
                        </div>
                        <div class="options options-obstacle">
                            <div class="option-title">
                                Obstacle Slot 3
                            </div>
                            <div class="options-container">
                                <div class="option-button options-yes" id="option-drawbridge" on="false" onclick="toggleOption('drawbridge')">
                                    Draw Bridge
                                </div>
                                <div class="option-button options-yes" id="option-sallyport" on="false" onclick="toggleOption('sallyport')">
                                    Sallyport
                                </div>
                            </div>
                            <form>
                                <input type="hidden" id="option-obstacle-drawbridge" value="false">
                                <input type="hidden" id="option-obstacle-sallyport" value="false">
                            </form>
                        </div>
                        <div class="options options-obstacle">
                            <div class="option-title">
                                Obstacle Slot 4
                            </div>
                            <div class="options-container">
                                <div class="option-button options-yes" id="option-terrain" on="false" onclick="toggleOption('terrain')">
                                    Rough Terrain
                                </div>
                                <div class="option-button options-yes" id="option-rockwall" on="false" onclick="toggleOption('rockwall')">
                                    Rock Wall
                                </div>
                            </div>
                            <form>
                                <input type="hidden" id="option-obstacle-terrain" value="false">
                                <input type="hidden" id="option-obstacle-rockwall" value="false">
                            </form>
                        </div>
                        <div class="options options-obstacle">
                            <div class="option-title">
                                Permanent Obstacle
                            </div>
                            <div class="options-container">
                                <div class="option-button options-yes" id="option-lowbar" on="false" onclick="toggleOption('lowbar')">
                                    Low Bar
                                </div>
                            </div>
                            <form>
                                <input type="hidden" id="option-obstacle-lowbar" value="false">
                            </form>
                        </div>
                    </div>
                </div>
                <div class="submit-button" onclick="submitData()">
                    Submit Data to Server
                </div>
            </div>

        </div>
    </div>
    <div id='mobile-notification' class='hidden'>
      <div id='mobile-img'>&nbsp</div>
      <div id='mobile-txt'>On mobile?<br>Pin to your homescreen.</div>
    </div>
</body>

</html>
