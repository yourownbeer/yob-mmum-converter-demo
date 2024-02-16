"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import convertMMuMToBeerXML from "mmum-beerxml-converter-beta";
import { XMLBuilder } from "fast-xml-parser";

export default function JsonConverter() {
  const [inputJson, setInputJson] = useState<string>("");
  const [outputJson, setOutputJson] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleConvert = () => {
    try {
      const parsedJson = JSON.parse(inputJson);
      const beerXML = convertMMuMToBeerXML(parsedJson);
      const builder = new XMLBuilder({
        processEntities: true,
        oneListGroup: true,
        format: true,
      });
      const beerXMLFile = builder.build(beerXML);
      setOutputJson(beerXMLFile);
      setError(""); // Reset error state if successful
    } catch (err: any) {
      setError("Invalid JSON input. Please correct and try again.");
    }
  };

  return (
    <div className="flex h-screen p-4 gap-4">
      <textarea
        className="w-1/2 h-full p-2 border border-gray-300 rounded-md resize-none"
        placeholder="Enter MMuM.json here"
        value={inputJson}
        onChange={(e) => setInputJson(e.target.value)}
      ></textarea>
      <div className="flex flex-col justify-center items-center w-1/6">
        <Button onClick={handleConvert}>Convert</Button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
      <textarea
        className="w-1/2 h-full p-2 border border-gray-300 rounded-md resize-none"
        placeholder="BeerXML will appear here"
        value={outputJson}
        readOnly
      ></textarea>
    </div>
  );
}
