package data;

public class Resort {
private String resortName;
private int snowDepth;
private int numChairLifts;

public Resort() {
	
}

public Resort(String resortName, int snowDepth, int numChairLifts) {
	super();
	this.resortName = resortName;
	this.snowDepth = snowDepth;
	this.numChairLifts = numChairLifts;
}


public String getResortName() {
	return resortName;
}


public void setResortName(String resortName) {
	this.resortName = resortName;
}


public int getSnowDepth() {
	return snowDepth;
}


public void setSnowDepth(int snowDepth) {
	this.snowDepth = snowDepth;
}


public int getNumChairLifts() {
	return numChairLifts;
}


public void setNumChairLifts(int numChairLifts) {
	this.numChairLifts = numChairLifts;
}


@Override
public String toString() {
	return "SnowFallDAO [resortName=" + resortName + ", snowDepth=" + snowDepth + ", numChairLifts=" + numChairLifts
			+ "]";
}
}