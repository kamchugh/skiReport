package data;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

public class SnowFallDAO {
	private static final String FILE_NAME = "/WEB-INF/resortReport.csv";

	private Map<String, Resort> resortMap = new HashMap<String, Resort>();

	@Autowired
	private ApplicationContext ac;

	@PostConstruct
	public void init() {
		try (InputStream is = ac.getResource(FILE_NAME).getInputStream();
				BufferedReader buf = new BufferedReader(new InputStreamReader(is));) {
			String line = buf.readLine();

			while ((line = buf.readLine()) != null) {
				System.out.println(line);
				String[] tokens = line.split(",");
				String resortName = tokens[0].trim();
				Integer snowDepth = Integer.parseInt(tokens[1]);
				Integer numChairs = Integer.parseInt(tokens[2]);
				resortMap.put(resortName, new Resort(resortName, snowDepth, numChairs));
			}
		} catch (Exception e) {
			System.err.println(e);
		}
	}

	public Resort getResortByName(String name) {
		System.out.println("This is the name I have in my DAO: " + name);
		List<Resort> resortList = new ArrayList<Resort>(resortMap.values());
		Resort r = null;
		for (Resort resort : resortList) {
			System.out.println("My resorts: " + resort.getResortName());
			if (resort.getResortName().equals(name)) {
				// resort.hashCode();
				// System.out.println(resort.hashCode());
				r = resort;
				System.out.println("I've matched a resort: " + r);
			}
		}
		return r;
	}

	public List<Resort> getAllResorts() {
		List<Resort> resortList = new ArrayList<Resort>(resortMap.values());
		return resortList;
	}
	
	public void addResort(Resort resort) {
		Resort r = new Resort(resort.getResortName(), resort.getSnowDepth(), resort.getNumChairLifts());
		resortMap.put(resort.getResortName(), r);
	}
	
	public void editResort(Resort resort, String name) {
		resortMap.remove(name);
		Resort r = new Resort(resort.getResortName(), resort.getSnowDepth(), resort.getNumChairLifts());
		resortMap.put(resort.getResortName(), r);
		
	}
	
	public void deleteResort(String name) {
		resortMap.remove(name);
		
		System.out.println("I have tried to remove the resort" + name);
		System.out.println(resortMap);
	
	}

}
