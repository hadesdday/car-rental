package com.carrental.template;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;

public class MailTemplate {
    private String template;
//    private Map<String, String> replacementParams;
//    private String htmlPath;

    public MailTemplate(String htmlPath){
        try {
            //setup content by Read bytes from HTML file
            this.template = loadTemplate(htmlPath);
        } catch (Exception e) {
            this.template = "Empty";
        }
    }
    private String loadTemplate(String htmlPath) throws Exception {
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(htmlPath);
        String content = "Empty";
        try {
            content = new String(Files.readAllBytes(file.toPath()));
            System.out.println(file.toPath());
        } catch (IOException e) {
            throw new Exception("Could not read template  = " + htmlPath);
        }
        return content;
    }
    public String getTemplate(Map<String, String> replacements) {
        //Replace the value by key
        for (Map.Entry<String, String> entry : replacements.entrySet()) {
            this.template = this.template.replace("{{" + entry.getKey() + "}}", entry.getValue());
        }
        return this.template;
    }
}
