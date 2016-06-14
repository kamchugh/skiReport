package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import data.Resort;
import data.SnowFallDAO;

@Controller
public class SkiController {

	@Autowired

	private SnowFallDAO dao;

//	@RequestMapping("getSnowDepth.do")
//	public ModelAndView getSnowDepth(@RequestParam("resortName") String resortName) {
//		ModelAndView mv = new ModelAndView();
//		System.out.println("Resort in my controller: " + resortName);
//		Resort resort = dao.getResortByName(resortName);
//		String snowfall = Integer.toString(resort.getSnowDepth());
//		String name = resort.getResortName();
//		System.out.println("This is my snowfall " + snowfall);
//		System.out.println("I've successfully gotten the right object: " + resort);
//		mv.addObject("snowfall", snowfall);
//		mv.addObject("name", name);
//		mv.setViewName("index.jsp");
//		return mv;
//	}
	
	@ResponseBody
	@RequestMapping("resorts/{resortName}")
	public Resort resort(@PathVariable String resortName) {
		Resort resort = dao.getResortByName(resortName);
		System.out.println(resort);
		return resort;
	}
	
	@ResponseBody
	@RequestMapping("resorts/allResorts")
	public List<Resort> resortList() {
		return dao.getAllResorts();
	}
	
	// adding a resort 
	
	@ResponseBody
	@RequestMapping(value = "resorts/allResorts", method = RequestMethod.POST)
	public void addResort(@RequestBody Resort r) {
		dao.addResort(r);
		
	}
	
	// edit a resort 
	
	@ResponseBody
	
	@RequestMapping(value = "resorts/{resortName}", method = RequestMethod.PUT)
	public void editResort(@RequestBody Resort r, @PathVariable String resortName ) {
		
		 dao.editResort(r, resortName);
		
	}
	
	@ResponseBody 
	@RequestMapping(value = "resorts/allResorts", method = RequestMethod.DELETE)
	public void deleteResort(@RequestBody String name) {
		dao.deleteResort(name);
		System.out.println("I am in the delete controller");
		
	}
	
	

}
